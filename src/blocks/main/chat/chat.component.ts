import {chatTemplate} from './chat.template'
import {Templator} from '../../../templator/templator'
import {Block} from '../../../block'
import './chat.sass'

export class ChatComponent extends Block {
    constructor(context: Object = {
        imgClass: 'chat-image'
    }) {
        super(context)
    }

    render() {
        const templator = new Templator(chatTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
