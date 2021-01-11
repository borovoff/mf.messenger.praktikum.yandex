import {messageTemplate} from './message.template'
import {Block} from '../../../block'
import './message.sass'

export class MessageComponent extends Block {
    constructor(context?: Object) {
        super(context, messageTemplate)
    }
}
