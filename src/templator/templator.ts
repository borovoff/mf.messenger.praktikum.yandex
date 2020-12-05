import {Store} from "../models/store"

export class Templator {
    private template: string
    private i = 0
    private readonly context: Object
    private element: HTMLElement
    private parent: HTMLElement
    private tempParent: HTMLElement

    private store: Store = {}

    constructor(template: string, parent: HTMLElement, context: Object) {
        this.template = template
            .replace(/(\r\n|\n|\r)/gm, '')
            .replace(/\s\s+/g, ' ')
        this.parent = parent
        this.tempParent = parent
        this.context = context
    }

    get(path: string, defaultValue?) {
        const keys = path.split('.')

        let result = this.context;
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
                    if (next !== '/') {
                        this.insideOpenTag()
                    } else {
                        this.insideCloseTag()
                    }
                    break
                case '{':
                    if (next === '{') {
                        this.i++
                        const value = this.getReactValue()
                        const key = 'textContent'
                        this.element[key] = this.get(value)
                        this.store[value] = {property: key, element: this.element}
                    }
                    break
                default:
                    break
            }
        }
    }

    attribute() {
        const start = ++this.i

        while (this.i < this.template.length) {
            const char = this.template.charAt(this.i)
            const next = this.template.charAt(this.i + 1)

            if (char === '=' && next === '"') {
                const key = this.template.slice(start, this.i)
                if (this.template.slice(this.i + 2, this.i + 4) === '{{') {
                    this.i += 4
                    const value = this.getReactValue()
                    this.i += 2

                    this.element.setAttribute(key, this.get(value))
                    this.store[value] = {property: key, element: this.element}
                    return
                } else {
                    this.i += 2
                    this.element.setAttribute(key, this.getValue())
                    return
                }
            }

            this.i++
        }
    }

    getValue(): string {
        const start = this.i

        while (this.i < this.template.length) {
            const char = this.template.charAt(this.i)

            this.i++

            if (char === '"') {
                return this.template.slice(start, this.i)
            }
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
                this.tempParent = this.element.parentElement
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
                    if (this.element.tagName !== 'INPUT') {
                        this.tempParent = this.element
                    }
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
        this.element = document.createElement(tag)
        this.tempParent.appendChild(this.element)
    }

    toHtml(): HTMLElement {
        this.newReplace()
        return this.tempParent
    }
}
