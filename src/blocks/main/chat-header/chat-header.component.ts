import {chatHeaderTemplate} from './chat-header.template'
import './chat-header.sass'
import {ContextMenuBlock} from '../../../components/context-menu-block'
import {router} from '../../../helpers/router-instance'
import {Pathname} from '../../../models/enums/pathname'

export class ChatHeaderComponent extends ContextMenuBlock {
    constructor(context: Object = {
        search: 'base-button-search',
        more: 'base-button-more',
        imgHeader: 'chat-image chat-header-img'
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
        router.go(Pathname.ChatUsers)
    }

    removeUser = () => {
        router.go(Pathname.RemoveUser)
    }
}
