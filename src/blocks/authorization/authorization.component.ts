import {Templator} from '../../templator/templator'
import {authorizationTemplate} from './authorization.template'
import {FormBlock} from '../../form-block'
import './authotization.sass'

export class AuthorizationComponent extends FormBlock {
    constructor(context: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(authorizationTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store

        setTimeout(() => this.setContext({name: 'hi'}), 1000)
    }
}
