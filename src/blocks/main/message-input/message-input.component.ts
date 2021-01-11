import {Block} from '../../../block'
import {messageInputTemplate} from './message-input.template'
import './message-input.sass'

export class MessageInputComponent extends Block {
    constructor(context: Object = {
        outerMicro: 'input-microphone',
        innerMicro: 'input-microphone-img'
    }) {
        super(context, messageInputTemplate)
    }
}
