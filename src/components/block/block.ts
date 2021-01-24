import {EventBus} from '../../event-bus'
import {Store} from '../../models/store'
import {ForStore} from '../../models/for-store'
import {Templator} from '../../templator/templator'
import {StoreItem} from '../../models/store-item'
import {forInsert} from '../../helpers/for-insert'
import {setProperty} from '../../helpers/set-property'

enum Events {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render'
}


export class Block extends HTMLElement {
    eventBus: EventBus
    context: any
    protected store: Store
    private readonly template: string

    constructor(context: Object = {}, template: string = '') {
        super()
        this.template = template
        this.context = this._makeContextProxy(context)
        this.eventBus = new EventBus()
        this._registerEvents(this.eventBus)
        this.eventBus.emit(Events.INIT)
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Events.INIT, this.init.bind(this))
        eventBus.on(Events.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Events.FLOW_CDU, this._componentDidUpdate.bind(this))
        eventBus.on(Events.FLOW_RENDER, this._render.bind(this))
    }

    init() {
        this.eventBus.emit(Events.FLOW_CDM)
    }

    _componentDidMount() {
        this.eventBus.emit(Events.FLOW_RENDER)
    }

    _componentDidUpdate() {
        this._render()
    }

    _render() {
        this.render()
    }

    render() {
        const templator = new Templator(this.template, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }

    setContext(context: Object) {
        Object.assign(this.context, context)
    }

    _makeContextProxy(context: Object): typeof Proxy {
        return new Proxy(context, {
            get: (target: any, prop: string) => {
                const value = target[prop]
                return typeof value === 'function' ? value.bind(target) : value
            },
            set: (target, prop: string, value) => {
                target[prop] = value

                this.storeResolver(prop, value)

                return true
            },
            deleteProperty: () => {
                throw new Error('Нет доступа')
            }
        })
    }

    forResolver(items: unknown[], item: StoreItem, element: HTMLElement) {
        const {elementProperties, element: forElement} = item.forStore as ForStore
        const parent = element.parentElement

        let previous = element.previousElementSibling
        while (previous && previous.tagName !== undefined) {
            const p = previous.previousElementSibling
            previous.remove()
            previous = p
        }

        forInsert(items, forElement, elementProperties, item.property, parent, element)
    }

    storeResolver(prop: string, value: any) {
        const items = this.store[prop]

        if (items === undefined) {
            return
        }

        for (const item of items) {
            const element = item.element

            if (element.tagName === undefined) {
                this.forResolver(value, item, element)
                continue
            }

            setProperty(element, value, item.property, item.arrayStore)
        }
    }

    addToDom() {
    }
}
