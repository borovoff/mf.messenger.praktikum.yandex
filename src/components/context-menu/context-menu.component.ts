import {Block} from '../block/block'
import {contextMenuTemplate} from './context-menu.template'
import './context-menu.sass'

export class ContextMenuComponent extends Block {
    constructor(context?: Object) {
        super(context, contextMenuTemplate)
    }
}
