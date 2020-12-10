import {Templator} from '../../templator/templator'
import {authorizationTemplate} from './authorization.template'
import {FormBlock} from '../../form-block'

export class AuthorizationComponent extends FormBlock {
    constructor(context: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(authorizationTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}

customElements.define('app-authorization', AuthorizationComponent)
