import {Store} from '../models/store'
import {ArrayStore} from '../models/array-store'
import {ElementProperties} from '../models/types/element-properties'
import {ForStore} from '../models/for-store'
import {contextGet} from '../helpers/context-get'
import {forInsert} from '../helpers/for-insert'
import {setProperty} from '../helpers/set-property'

interface StoreResult {
    value: string
    arrayStore?: ArrayStore
}

interface ElementStore {
    tag: string
    elementProperties: ElementProperties
}

export class Templator {
    private template: string
    private i = 0
    private readonly context: any
    private element: HTMLElement | Comment
    private parent: HTMLElement | Comment

    private _store: Store = {}

    private elementStore: ElementStore = {tag: '', elementProperties: {}}

    constructor(template: string, parent: HTMLElement, context: Object) {
        this.template = template
            .replace(/(\r\n|\n|\r)/gm, '')
            .replace(/\s\s+/g, ' ')
        this.parent = parent
        this.context = context
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
                        this.element[key] = contextGet(result.value, this.context)

                        this.i += 2
                    }
                    break
                default:
                    this.textContent()
                    break
            }
        }
    }

    addToStore(value: string, key: string, element = this.element, forStore?: ForStore): StoreResult {
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
        this._store[value].push({property: key, element: element, arrayStore, forStore})

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
                this.elementStore.elementProperties[key] = this.getValue()

                return
            }

            this.i++
        }
    }

    setAttr(itemName?: string): ForStore {
        const element = this.addTag(this.elementStore.tag)
        const elementProperties: ElementProperties = {}

        for (let [key, value] of Object.entries(this.elementStore.elementProperties)) {
            const first = key.charAt(0)
            const last = key.charAt(key.length - 1)

            if (first === '[' && last === ']') {
                key = key.slice(1, key.length - 1)

                if (itemName !== undefined && value.startsWith(itemName)) {
                    elementProperties[key] = value
                    continue
                }

                const result = this.addToStore(value, key, element)
                value = contextGet(result.arrayStore ? result.value : value, this.context)
                setProperty(element, value, key, result.arrayStore)
            } else {
                setProperty(element, value, key)
            }
        }

        return {element, elementProperties}
    }

    setAttributes() {
        // TODO: add nested elements in for and if not custom element
        const properties = this.elementStore.elementProperties

        if (properties.hasOwnProperty('*for')) {
            const start = document.createComment('start')
            const end = document.createComment('end')

            const array = properties['*for'].split(' of ')
            const [itemName, itemsName] = array

            const {element, elementProperties} = this.setAttr(itemName)

            const values = contextGet(itemsName, this.context)

            this.addToStore(itemsName, itemName, end, {element, elementProperties})
            this.parent.appendChild(start)
            this.parent.appendChild(end)
            this.element = end

            forInsert(values, element, elementProperties, itemName, this.parent as HTMLElement, end)
        } else {
            const {element} = this.setAttr()
            this.element = element
            this.parent.appendChild(element)
        }

        this.elementStore.elementProperties = {}
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
                        this.setTag(start)
                    }

                    this.setAttributes()

                    const tagName = (this.element as HTMLElement).tagName
                    if (tagName !== 'INPUT' && tagName !== 'IMG') {
                        this.parent = this.element
                    }

                    this.i++
                    return
                case ' ':
                    if (first) {
                        first = false
                        this.setTag(start)
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

    setTag(start: number) {
        this.elementStore.tag = this.template.slice(start, this.i)
    }

    addTag(tag: string): HTMLElement {
        if (tag.slice(0, 4) === 'app-') {
            const constructor = customElements.get(tag)
            return new constructor()
        } else {
            return document.createElement(tag)
        }
    }

    get store(): Store {
        return this._store
    }
}
