import {Block} from '../components/block/block'
import {ArrayStore} from '../models/array-store'

export function setProperty(element: HTMLElement, value: any, propertyName: string, arrayStore?: ArrayStore) {
    switch (propertyName) {
        case 'class':
            if (arrayStore) {
                arrayStore.tokens[arrayStore.index] = value
                element.className = arrayStore.tokens.join(' ')
            } else {
                element.className = value
            }
            return
        case 'submit':
        case 'blur':
        case 'focus':
        case 'click':
            const fn = value as (event: Event) => any
            element.addEventListener(propertyName, fn)
            return
        default:
            break
    }

    if (element.tagName.slice(0, 4) === 'APP-') {
        (element as Block).setContext({[propertyName]: value})
    } else {
        switch (propertyName) {
            case 'textContent':
                element.textContent = value
                break
            default:
                element.setAttribute(propertyName, value ?? '')
                break
        }
    }
}
