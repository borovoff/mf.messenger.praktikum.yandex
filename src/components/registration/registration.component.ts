import {Templator} from '../../templator/templator'
import {registrationTemplate} from './registration.template'
import {Block} from '../../block'

export class RegistrationComponent extends Block {
    constructor(context: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(registrationTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}

customElements.define('app-registration', RegistrationComponent)
