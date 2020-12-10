import {EventBus} from './event-bus'
import {Store} from './models/store'

interface Meta {
    tagName: string
    props: any
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
    props: any
    eventBus: () => EventBus

    protected context: Object
    protected store: Store

    constructor(context: Object = {}, tagName = 'div', props = {name: 'lol'}) {
        super()
        const eventBus = new EventBus()
        this._meta = {
            tagName,
            props
        }

        this.context = this._makeContextProxy(context)
        this.props = this._makePropsProxy(props)
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

    public setProps(nextProps: any) {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)
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

    _makePropsProxy(props: any) {
        return new Proxy(props, {
            get: (target, prop) => {
                const value = target[prop]
                return typeof value === 'function' ? value.bind(target) : value
            },
            set: (target, prop, value) => {
                target[prop] = value
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target)
                return true
            },
            deleteProperty: () => {
                throw new Error('Нет доступа')
            }
        })
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

                        if (element.tagName.slice(0, 4) === 'APP-') {
                            (element as Block).setContext({[item.property]: value})
                        } else {
                            switch (item.property) {
                                case 'class':
                                    element.className = value
                                    break
                                case 'textContent':
                                    element.textContent = value
                                    break
                                case 'submit':
                                case 'blur':
                                case 'focus':
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
