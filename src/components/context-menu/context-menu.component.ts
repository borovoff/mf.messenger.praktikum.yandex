import {Templator} from '../../templator/templator'
import {Block} from '../../block'
import {contextMenuTemplate} from './context-menu.template'
import './context-menu.sass'

export class ContextMenuComponent extends Block {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(contextMenuTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
