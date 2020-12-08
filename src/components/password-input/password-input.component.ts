import {Templator} from '../../templator/templator'
import {Block} from '../../block'
import {passwordInputTemplate} from './password-input.template'

export class PasswordInputComponent extends Block {
    constructor(context: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(passwordInputTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}

customElements.define('app-password-input', PasswordInputComponent);
