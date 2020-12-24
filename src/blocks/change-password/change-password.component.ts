import {Templator} from '../../templator/templator'
import {changePasswordTemplate} from './change-password.template'
import {FormBlock} from '../../form-block'
import './change-password.sass'
import '../authorization/authotization.sass'

export class ChangePasswordComponent extends FormBlock {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(changePasswordTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
