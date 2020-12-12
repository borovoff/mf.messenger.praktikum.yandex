import {chatImageTemplate} from './chat-image.template'
import {Templator} from '../../../templator/templator'
import {Block} from '../../../block'

export class ChatImageComponent extends Block {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(chatImageTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
