import {Templator} from '../../../templator/templator'
import {Block} from '../../../block'
import {controlRowTemplate} from './control-row.template'
import './control-row.sass'

export class ControlRowComponent extends Block {
    constructor(context: Object = {
        outerMenu: 'menu-button',
        innerMenu: 'base-button-menu',
        items: [
            {
                class: 'class',
                text: 'text'
            },
            {
                class: 'class1',
                text: 'text1'
            }
        ],
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
            showMenu: this.showMenu
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
}
