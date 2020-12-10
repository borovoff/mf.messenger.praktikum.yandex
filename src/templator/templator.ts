import {Store} from '../models/store'
import {ComponentName} from '../models/enums/component-name'
import {InputComponent} from '../components/input/input.component'
import { Block } from 'src/block'
import {PasswordInputComponent} from '../components/password-input/password-input.component'
import {ButtonComponent} from '../components/button/button.component'
import {ChatImageComponent} from '../components/main/chat-image/chat-image.component'
import {ChatComponent} from '../components/main/chat/chat.component'
import {MessageComponent} from '../components/main/message/message.component'

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
                    if (next !== '/') {
                        this.insideOpenTag()
                    } else {
                        this.insideCloseTag()
                    }
                    break
                case ' ':
                    break
                case '{':
                    if (next === '{') {
                        this.i++
                        const value = this.getReactValue()
                        const key = 'textContent'
                        this.element[key] = this.get(value)

                        this.addToStore(value, key)

                        this.i += 2
                    }
                    break
                default:
                    this.textContent()
                    break
            }
        }
    }

    addToStore(value: string, key: string) {
        if (this._store[value] === undefined) {
            this._store[value] = []
        }

        this._store[value].push({property: key, element: this.element})
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
                if (key.charAt(0) === '[' && key.charAt(key.length - 1) === ']') {
                    key = key.slice(1, key.length - 1)
                    this.addToStore(value, key)
                    value = this.get(value) as any
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
                        this.element.setAttribute(key, value)
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
            const componentName = tag.slice(4) as ComponentName
            switch (componentName) {
                case ComponentName.Input:
                    this.element = new InputComponent()
                    break
                case ComponentName.PasswordInput:
                    this.element = new PasswordInputComponent()
                    break
                case ComponentName.Button:
                    this.element = new ButtonComponent()
                    break
                case ComponentName.ChatImage:
                    this.element = new ChatImageComponent()
                    break
                case ComponentName.Chat:
                    this.element = new ChatComponent()
                    break
                case ComponentName.Message:
                    this.element = new MessageComponent()
                    break
                default:
                    throw new Error('not known custom component')
            }
        } else {
            this.element = document.createElement(tag)
        }

        this.parent.appendChild(this.element)
    }

    get store(): Store {
        return this._store
    }
}
