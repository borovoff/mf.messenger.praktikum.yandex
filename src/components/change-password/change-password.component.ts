import {Templator} from '../../templator/templator'
import {Block} from '../../block'
import {changePasswordTemplate} from './change-password.template'

export class ChangePasswordComponent extends Block {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(changePasswordTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}

customElements.define('app-change-password', ChangePasswordComponent)
