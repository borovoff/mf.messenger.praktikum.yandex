import {emailInputTemplate} from './email-input.template'
import {FormBlock} from '../form-block'
import '../input/input.sass'

export class EmailInputComponent extends FormBlock {
    constructor(context?: Object) {
        super(context, emailInputTemplate)
    }
}
