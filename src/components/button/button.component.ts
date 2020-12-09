import {Templator} from '../../templator/templator'
import {Block} from '../../block'
import {buttonTemplate} from './button.template'

export class ButtonComponent extends Block {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(buttonTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}

customElements.define('app-button', ButtonComponent)
