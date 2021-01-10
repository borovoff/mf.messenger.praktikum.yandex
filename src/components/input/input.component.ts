import {Templator} from '../../templator/templator'
import {inputTemplate} from './input.template'
import {FormBlock} from '../form-block'
import './input.sass'

export class InputComponent extends FormBlock {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(inputTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
