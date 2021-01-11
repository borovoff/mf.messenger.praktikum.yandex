import {contextMenuItemTemplate} from './context-menu-item.template'
import './context-menu-item.sass'
import {Block} from '../../../block'

export class ContextMenuItemComponent extends Block {
    constructor(context?: Object) {
        super(context, contextMenuItemTemplate)
    }
}
