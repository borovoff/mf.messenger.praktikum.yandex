import {chatImageTemplate} from './chat-image.template'
import {Block} from '../../../block'
import './chat-image.sass'

export class ChatImageComponent extends Block {
    constructor(context?: Object) {
        super(context, chatImageTemplate)
    }
}
