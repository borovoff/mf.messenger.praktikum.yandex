import {inputTemplate} from './input.template'
import {FormBlock} from '../form-block'
import './input.sass'

export class InputComponent extends FormBlock {
    constructor(context?: Object) {
        super(context, inputTemplate)
    }
}
