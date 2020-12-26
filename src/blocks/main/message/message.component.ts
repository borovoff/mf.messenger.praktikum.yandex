import {messageTemplate} from './message.template'
import {Templator} from '../../../templator/templator'
import {Block} from '../../../block'
import './message.sass'

export class MessageComponent extends Block {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(messageTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
