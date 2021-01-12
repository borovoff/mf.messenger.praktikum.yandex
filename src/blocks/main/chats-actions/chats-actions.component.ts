import {chatsActionsTemplate} from './chats-actions.template'
import './chats-actions.sass'
import {ContextMenuBlock} from '../../../components/block/context-menu-block'
import {router} from '../../../helpers/router/router-instance'
import {Pathname} from '../../../models/enums/pathname'

export class ChatsActionsComponent extends ContextMenuBlock {
    constructor(context: Object = {
        outerEdit: 'icon-button icon-button_blue',
        innerEdit: 'icon-button__img icon-button__img_edit'
    }) {
        super('context-menu context-menu_edit-chat', context, chatsActionsTemplate)

        this.setContext({
            items: [
                {
                    class: 'item__icon_group',
                    text: 'New chat',
                    click: this.createChat
                }
            ],
        })
    }

    createChat = () => {
        router.go(Pathname.CreateChat)
    }
}
