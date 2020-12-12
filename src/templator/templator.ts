import {Store} from '../models/store'
import {Block} from 'src/block'
import {ArrayStore} from '../models/array-store'

interface StoreResult {
    value: string
    arrayStore?: ArrayStore
}

export class Templator {
    private template: string
    private i = 0
    private readonly context: any
    private element: HTMLElement
    private parent: HTMLElement

    private _store: Store = {}

    constructor(template: string, parent: HTMLElement, context: Object) {
        this.template = template
            .replace(/(\r\n|\n|\r)/gm, '')
            .replace(/\s\s+/g, ' ')
        this.parent = parent
        this.context = context
    }

    get(path: string, defaultValue?: string) {
        const keys = path.split('.')

        let result = this.context
        for (let key of keys) {
            result = result[key]

            if (result === undefined) {
                return defaultValue
            }
        }

        return result ?? defaultValue
    }

    newReplace() {
        while (this.i < this.template.length) {
            const char = this.template.charAt(this.i)
            const next = this.template.charAt(this.i + 1)

            this.i++
            switch (char) {
                case '<':
                    if (next === '/') {
                        this.insideCloseTag()
                    } else {
                        this.insideOpenTag()
                    }
                    break
                case ' ':
                    break
                case '{':
                    if (next === '{') {
                        this.i++
                        const key = 'textContent'
                        const value = this.getReactValue()
                        const result = this.addToStore(value, key)

                        const arrayStore = result.arrayStore
                        if (arrayStore === undefined) {
                            this.element[key] = this.get(result.value)
                        } else {
                            arrayStore.tokens[arrayStore.index] = this.get(result.value)
                            this.element[key] = arrayStore.tokens.join(' ')
                        }

                        this.i += 2
                    }
                    break
                default:
                    this.textContent()
                    break
            }
        }
    }

    addToStore(value: string, key: string): StoreResult {
        let arrayStore: ArrayStore

        if (value.includes('+')) {
            let tokens = value.split('+')
            const index = tokens.findIndex(element => !element.includes('\''))

            tokens = tokens.map(token => token.trim().replace(/'/g, ''))

            if (index > -1) {
                arrayStore = {tokens, index}
                value = tokens[index]
            } else {
                throw new Error('not found variable')
            }
        }

        if (this._store[value] === undefined) {
            this._store[value] = []
        }

        // @ts-ignore
        this._store[value].push({property: key, element: this.element, arrayStore})

        // @ts-ignore
        return {value, arrayStore}
    }

    textContent() {
        const start = this.i - 1

        while (this.i < this.template.length) {
            const next = this.template.charAt(this.i + 1)

            if (next === '<') {
                this.i++
                this.parent.textContent = this.template.slice(start, this.i)
                return
            }

            this.i++
        }
    }

    attribute() {
        const start = ++this.i

        while (this.i < this.template.length) {
            const char = this.template.charAt(this.i)
            const next = this.template.charAt(this.i + 1)

            if (char === '=' && next === '"') {
                let key = this.template.slice(start, this.i)
                this.i += 2
                let value = this.getValue()

                const first = key.charAt(0)
                const last = key.charAt(key.length - 1)

                // TODO: rewrite
                let result: StoreResult
                if (first === '[' && last === ']') {
                    key = key.slice(1, key.length - 1)
                    result = this.addToStore(value, key)

                    value = this.get(value)
                }

                // TODO: same logic as block proxy
                if (this.element.tagName.slice(0, 4) === 'APP-') {
                    (this.element as Block).setContext({[key]: value})
                } else {
                    if (key === 'submit' || key === 'blur' || key === 'focus') {
                        // @ts-ignore
                        const fn = value as (event: Event) => any
                        this.element.addEventListener(key, fn)
                    } else {
                        // @ts-ignore
                        if (result && result.arrayStore) {
                            const arrayStore = result.arrayStore
                            arrayStore.tokens[arrayStore.index] = this.get(result.value)
                            this.element.setAttribute(key, arrayStore.tokens.join(' '))
                        } else {
                            this.element.setAttribute(key, value)
                        }
                    }
                }

                return
            }

            this.i++
        }
    }

    getValue(): string {
        const start = this.i

        while (this.i < this.template.length) {
            const char = this.template.charAt(this.i)

            if (char === '"') {
                return this.template.slice(start, this.i)
            }

            this.i++
        }

        throw new Error('not found close "')
    }

    getReactValue(): string {
        const start = this.i

        while (this.i < this.template.length) {
            const char = this.template.charAt(this.i)
            const next = this.template.charAt(this.i + 1)


            if (char === '}' && next === '}') {
                return this.template.slice(start, this.i)
            }

            this.i++
        }

        throw new Error('not found close }}')
    }

    insideCloseTag() {
        while (this.i < this.template.length) {
            const char = this.template.charAt(this.i)

            this.i++

            if (char === '>') {
                this.parent = this.parent.parentElement as HTMLElement
                return
            }
        }

        throw new Error('not found close >')
    }


    insideOpenTag() {
        let first = true
        const start = this.i

        while (this.i < this.template.length) {
            const char = this.template.charAt(this.i)

            switch (char) {
                case '>':
                    if (first) {
                        first = false
                        this.addTag(start)
                    }

                    const tagName = this.element.tagName
                    if (tagName !== 'INPUT' && tagName !== 'IMG') {
                        this.parent = this.element
                    }

                    this.i++
                    return
                case ' ':
                    if (first) {
                        first = false
                        this.addTag(start)
                    } else {
                        this.attribute()
                    }
                    break
                default:
                    this.i++
                    break
            }
        }

        throw new Error('not found close >')
    }

    addTag(start: number) {
        const tag = this.template.slice(start, this.i)

        if (tag.slice(0, 4) === 'app-') {
            const constructor = customElements.get(tag)
            this.element = new constructor()
        } else {
            this.element = document.createElement(tag)
        }

        this.parent.appendChild(this.element)
    }

    get store(): Store {
        return this._store
    }
}
