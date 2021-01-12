import {passwordInputTemplate} from './password-input.template'
import {FormBlock} from '../block/form-block'
import './password-input.sass'
import '../input/input.sass'

export class PasswordInputComponent extends FormBlock {
    constructor(context?: Object) {
        super(context, passwordInputTemplate)
    }
}
