import {Templator} from '../../templator/templator'
import {registrationTemplate} from './registration.template'
import {FormBlock} from '../../form-block'
import '../authorization/authotization.sass'

export class RegistrationComponent extends FormBlock {
    constructor(context: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(registrationTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
