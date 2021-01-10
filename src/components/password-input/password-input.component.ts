import {Templator} from '../../templator/templator'
import {passwordInputTemplate} from './password-input.template'
import {FormBlock} from '../form-block'
import './password-input.sass'
import '../input/input.sass'

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
