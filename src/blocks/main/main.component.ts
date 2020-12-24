import {Templator} from '../../templator/templator'
import {mainTemplate} from './main.template'
import {Block} from '../../block'
import './chat-header.sass'
import './chat-photo-header.sass'
import './chats.sass'
import './menu-button.sass'
import './message-input.sass'
import './messages.sass'
import './search.sass'
import './main.sass'

export class MainComponent extends Block {
    constructor(context: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(mainTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
