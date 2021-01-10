import {Templator} from '../../../templator/templator'
import {chatHeaderTemplate} from './chat-header.template'
import './chat-header.sass'
import {ContextMenuBlock} from '../../../components/context-menu-block'

export class ChatHeaderComponent extends ContextMenuBlock {
    constructor(context: Object = {
        search: 'base-button-search',
        more: 'base-button-more',
        imgHeader: 'chat-image chat-header-img'
    }) {
        super('context-menu context-menu_chat-header', context)

        this.setContext({
            items: [
                {
                    class: 'item__icon_group',
                    text: 'Chat users',
                    click: this.addMembers
                }
            ],
        })
    }

    render() {
        const templator = new Templator(chatHeaderTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }

    addMembers = () => {
        console.log('hi')
    }
}
