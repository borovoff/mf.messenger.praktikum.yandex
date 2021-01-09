import {EventBus} from './event-bus'
import {Store} from './models/store'
import {ForStore} from './models/for-store'
import {contextGet} from './helpers/context-get'

interface Meta {
    tagName: string
}

export class Block extends HTMLElement {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    }
    _element: HTMLElement
    _meta: Meta
    eventBus: () => EventBus

    protected context: any
    protected store: Store

    constructor(context: Object = {}, tagName = 'div') {
        super()
        const eventBus = new EventBus()
        this._meta = {
            tagName
        }

        this.context = this._makeContextProxy(context)
        this.eventBus = () => eventBus
        this._registerEvents(eventBus)
        eventBus.emit(Block.EVENTS.INIT)
    }
    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    }
    _createResources() {
        const { tagName } = this._meta
        this._element = this._createDocumentElement(tagName)
    }
    init() {
        this._createResources()
        this.eventBus().emit(Block.EVENTS.FLOW_CDM)
    }
    _componentDidMount() {
        this.componentDidMount()
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
    componentDidMount() {}

    _componentDidUpdate() {
        const response = this.componentDidUpdate()
        if (!response) {
            return
        }
        this._render()
    }

    componentDidUpdate() {
        return true
    }

    get element(): HTMLElement {
        return this._element
    }
    _render() {
        this.render()
    }

    render() {}

    getContent() {
        return this.element
    }

    setContext(context: Object) {
        Object.assign(this.context, context)
    }

    // @ts-ignore
    _makeContextProxy(context: Object): Proxy {
        return new Proxy(context, {
            get: (target: any, prop: string) => {
                const value = target[prop]
                return typeof value === 'function' ? value.bind(target) : value
            },
            set: (target, prop: string, value) => {
                target[prop] = value
                const items = this.store[prop]

                if (items !== undefined) {
                    items.forEach(item => {
                        const element = item.element

                        if (element.tagName === undefined) {
                            const {elementProperties, element: forElement} = item.forStore as ForStore
                            if (value) {
                                value.forEach((v: any) => {
                                    const newElement = forElement.cloneNode(false) as Block
                                    for (const [key, propertyValue] of Object.entries(elementProperties)) {
                                        const path = propertyValue.slice(item.property.length + 1)
                                        const val = contextGet(path, v)
                                        switch (key) {
                                            case 'class':
                                                newElement.className = val
                                                break
                                            case 'click':
                                                // @ts-ignore
                                                const fn = val as (event: Event) => any
                                                newElement.addEventListener(key, fn)
                                                break
                                            default:
                                                newElement.setContext({[key]: val})
                                        }
                                    }

                                    const parent = element.parentElement
                                    if (parent !== null) {
                                        parent.insertBefore(newElement, element)
                                    }
                                })
                            }

                        } else if (element.tagName.slice(0, 4) === 'APP-') {
                            if (item.property === 'class') {
                                element.className = value
                            } else {
                                (element as Block).setContext({[item.property]: value})
                            }
                        } else {
                            switch (item.property) {
                                case 'class':
                                    const arrayStore = item.arrayStore
                                    if (arrayStore) {
                                        arrayStore.tokens[arrayStore.index] = value
                                        const s = arrayStore.tokens.join(' ')
                                        element.className = s
                                    } else {
                                        element.className = value
                                    }
                                    break
                                case 'textContent':
                                    element.textContent = value
                                    break
                                case 'submit':
                                case 'blur':
                                case 'focus':
                                case 'click':
                                    // @ts-ignore
                                    const fn = value as (event: Event) => any
                                    element.addEventListener(item.property, fn)
                                    break
                                default:
                                    element.setAttribute(item.property, value)
                                    break
                            }
                        }
                    })
                }

                return true
            },
            deleteProperty: () => {
                throw new Error('Нет доступа')
            }
        })
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName)
    }

    show() {
        this.getContent().style.display = 'block'
    }

    hide() {
        this.getContent().style.display = 'none'
    }
}
