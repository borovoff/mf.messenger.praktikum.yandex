import {Templator} from '../../../templator/templator'
import {Block} from '../../../block'
import {controlRowTemplate} from './control-row.template'
import './control-row.sass'

export class ControlRowComponent extends Block {
    constructor(context: Object = {
        outerMenu: 'menu-button',
        innerMenu: 'base-button-menu',
        items: [],
        menuClass: 'hide'
    }) {
        super(context)

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
        this.setContext({
            menuClass: 'context-menu'
        })
    }
}
