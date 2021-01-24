import {contextGet} from './context-get'
import {Block} from '../components/block/block'
import {ElementProperties} from '../models/types/element-properties'
import {CustomNullable} from '../models/types/custom-nullable'

export function forInsert(values: unknown[], forElement: HTMLElement, elementProperties: ElementProperties, itemName: string,
                          parent: CustomNullable<HTMLElement>, element: HTMLElement | Comment) {
    if (!values || parent === null) {
        return
    }

    values.forEach((v: unknown) => {
        const newElement = forElement.cloneNode(false) as Block
        for (const [key, propertyValue] of Object.entries(elementProperties)) {
            let val = v

            if (propertyValue.includes('.')) {
                const path = propertyValue.slice(itemName.length + 1)
                val = contextGet(path, v)
            }

            switch (key) {
                case 'class':
                    newElement.className = val as string
                    break
                case 'click':
                    const fn = val as (event: Event) => any
                    newElement.addEventListener(key, fn)
                    break
                default:
                    newElement.setContext({[key]: val})
                    break
            }
        }

        parent.insertBefore(newElement, element)
    })
}
