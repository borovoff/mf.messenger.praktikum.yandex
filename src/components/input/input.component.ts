import {Templator} from '../../templator/templator'
import {Block} from '../../block'
import {inputTemplate} from './input.template'

export class InputComponent extends Block {
    constructor(context: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(inputTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}

customElements.define('app-input', InputComponent);
