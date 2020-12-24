import {Templator} from '../../../templator/templator'
import {Block} from '../../../block'
import {chatHeaderTemplate} from './chat-header.template'
import './chat-header.sass'

export class ChatHeaderComponent extends Block {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(chatHeaderTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
