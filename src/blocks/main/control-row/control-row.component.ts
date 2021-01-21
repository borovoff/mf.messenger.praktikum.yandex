import {controlRowTemplate} from './control-row.template'
import './control-row.sass'
import {router} from '../../../helpers/router/router-instance'
import {Pathname} from '../../../models/enums/pathname'
import {ContextMenuBlock} from '../../../components/block/context-menu-block'
import {api} from '../../../helpers/api/api'

export class ControlRowComponent extends ContextMenuBlock {
    constructor(context: Object = {
        outerMenu: 'menu-button',
        innerMenu: 'base-button-menu'
    }) {
        super('context-menu context-menu_main', context, controlRowTemplate)

        this.setContext({
            items: [
                {
                    class: 'item__icon_edit',
                    text: 'Edit profile',
                    click: this.editProfile
                },
                {
                    class: 'item__icon_edit',
                    text: 'Edit password',
                    click: this.editPassword
                },
                {
                    class: 'item__icon_logout',
                    text: 'Logout',
                    click: this.logout
                }
            ],
        })
    }

    editPassword = () => {
        router.go(Pathname.ChangePassword)
    }

    editProfile = () => {
        router.go(Pathname.Settings)
    }

    logout = () => {
        api.logout
            .then(() => router.go(Pathname.Authorization))
    }
}
