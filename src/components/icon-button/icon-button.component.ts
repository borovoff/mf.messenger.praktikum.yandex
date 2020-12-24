import {Templator} from '../../templator/templator'
import {Block} from '../../block'
import {iconButtonTemplate} from './icon-button.template'
import './icon-button.sass'

export class IconButtonComponent extends Block {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(iconButtonTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
