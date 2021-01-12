import {chatHeaderTemplate} from './chat-header.template'
import './chat-header.sass'
import {ContextMenuBlock} from '../../../components/block/context-menu-block'
import {router} from '../../../helpers/router/router-instance'
import {Pathname} from '../../../models/enums/pathname'

export class ChatHeaderComponent extends ContextMenuBlock {
    constructor(context: Object = {
        search: 'base-button-search',
        more: 'base-button-more',
        circleClass: 'letter-circle letter-circle_chat-header'
    }) {
        super('context-menu context-menu_chat-header', context, chatHeaderTemplate)

        this.setContext({
            items: [
                {
                    class: 'item__icon_add-user',
                    text: 'Add user',
                    click: this.addMembers
                },
                {
                    class: 'item__icon_delete-user',
                    text: 'Remove user',
                    click: this.removeUser
                }
            ],
        })
    }

    addMembers = () => {
        router.go(Pathname.ChatUsers, {chatId: this.context.chat.id})
    }

    removeUser = () => {
        router.go(Pathname.RemoveUser, {chatId: this.context.chat.id})
    }
}
