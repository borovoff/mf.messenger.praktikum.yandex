import {Block} from '../../block'
import {errorTemplate} from './error.template'
import {Templator} from '../../templator/templator'

export class ErrorComponent extends Block {
    constructor(context: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(errorTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}

customElements.define('app-error', ErrorComponent)
