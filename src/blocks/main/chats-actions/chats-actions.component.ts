import {Templator} from '../../../templator/templator'
import {chatsActionsTemplate} from './chats-actions.template'
import './chats-actions.sass'
import {ContextMenuBlock} from '../../../components/context-menu-block'
import {router} from '../../../helpers/router-instance'
import {Pathname} from '../../../models/enums/pathname'

export class ChatsActionsComponent extends ContextMenuBlock {
    constructor(context: Object = {
        outerEdit: 'icon-button icon-button_blue',
        innerEdit: 'icon-button__img icon-button__img_edit'
    }) {
        super('context-menu context-menu_edit-chat', context)

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

    render() {
        const templator = new Templator(chatsActionsTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }

    createChat = () => {
        router.go(Pathname.CreateChat)
    }
}
