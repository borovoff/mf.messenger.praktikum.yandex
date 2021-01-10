import {Templator} from '../../templator/templator'
import {emailInputTemplate} from './email-input.template'
import {FormBlock} from '../form-block'
import '../input/input.sass'

export class EmailInputComponent extends FormBlock {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(emailInputTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
