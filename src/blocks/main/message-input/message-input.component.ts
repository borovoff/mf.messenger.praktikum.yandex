import {Templator} from '../../../templator/templator'
import {Block} from '../../../block'
import {messageInputTemplate} from './message-input.template'
import './message-input.sass'

export class MessageInputComponent extends Block {
    constructor(context: Object = {
        outerMicro: 'input-microphone',
        innerMicro: 'input-microphone-img'
    }) {
        super(context)
    }

    render() {
        const templator = new Templator(messageInputTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
