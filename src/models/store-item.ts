import {ArrayStore} from './array-store'
import {ForStore} from './for-store'

export class StoreItem {
    property: string
    element: HTMLElement
    arrayStore?: ArrayStore
    forStore?: ForStore
}
