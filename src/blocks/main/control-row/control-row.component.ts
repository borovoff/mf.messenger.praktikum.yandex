import {Templator} from '../../../templator/templator'
import {Block} from '../../../block'
import {controlRowTemplate} from './control-row.template'
import './control-row.sass'
import {router} from '../../../helpers/router-instance'
import {Pathname} from '../../../models/enums/pathname'
import {http} from '../../../helpers/http'
import {API} from '../../../constants/api'

export class ControlRowComponent extends Block {
    constructor(context: Object = {
        outerMenu: 'menu-button',
        innerMenu: 'base-button-menu',
        menuClass: 'hide'
    }) {
        super(context)

        window.addEventListener('click', () => {
            if (this.context.menuClass === 'context-menu') {
                this.setContext({
                    menuClass: 'hide'
                })
            }
        })

        this.setContext({
            showMenu: this.showMenu,
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

    render() {
        const templator = new Templator(controlRowTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }

    showMenu = () => {
        setTimeout(() => this.setContext({
            menuClass: 'context-menu'
        }))
    }

    editPassword = () => {
        router.go(Pathname.ChangePassword)
    }

    editProfile = () => {
        router.go(Pathname.Settings)
    }

    logout = () => {
        http.post(API.logout)
            .then(() => router.go(Pathname.Index))
    }
}
