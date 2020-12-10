import {Templator} from '../../templator/templator'
import {passwordInputTemplate} from './password-input.template'
import {FormBlock} from '../../form-block'

export class PasswordInputComponent extends FormBlock {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(passwordInputTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}

customElements.define('app-password-input', PasswordInputComponent)
