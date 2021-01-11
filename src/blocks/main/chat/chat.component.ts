import {chatTemplate} from './chat.template'
import {Block} from '../../../block'
import './chat.sass'

export class ChatComponent extends Block {
    constructor(context: Object = {
        imgClass: 'chat-image'
    }) {
        super(context, chatTemplate)
    }
}
