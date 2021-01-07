import {contextMenuItemTemplate} from './context-menu-item.template'
import './context-menu-item.sass'
import {Block} from '../../../block'
import {Templator} from '../../../templator/templator'

export class ContextMenuItemComponent extends Block {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(contextMenuItemTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
