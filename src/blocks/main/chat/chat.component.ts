import {chatTemplate} from './chat.template'
import {Block} from '../../../block'
import './chat.sass'

export class ChatComponent extends Block {
    constructor(context?: Object) {
        super(context, chatTemplate)
    }
}
