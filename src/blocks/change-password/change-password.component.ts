import {Templator} from '../../templator/templator'
import {changePasswordTemplate} from './change-password.template'
import {FormBlock} from '../../form-block'
import './change-password.sass'
import '../authorization/authotization.sass'
import {http} from '../../helpers/http'
import {API} from '../../constants/api'
import {router} from '../../helpers/router-instance'
import {Pathname} from '../../models/enums/pathname'
import {kebabToCamel} from '../../helpers/kebab-to-camel'

export class ChangePasswordComponent extends FormBlock {
    constructor(context: Object = {
        button: {
            inner: 'base-button-back'
        },
        oldPassword: 'Old password',
        newPassword: 'New password',
        repeatPassword: 'Repeat password',
        buttonValue: 'Change'
    }) {
        super(context)

        this.setContext({
            submit: this.passSubmit
        })
    }

    render() {
        const templator = new Templator(changePasswordTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }

    passSubmit = (event: Event) => {
        const object = this.submit(event)

        if (object !== null) {
            const camelObject: any = {}
            for (const [key, value] of Object.entries(object)) {
                camelObject[kebabToCamel(key)] = value
            }

            http.put(API.changePassword, camelObject)
                .then(() => router.go(Pathname.Slash))
        }
    }
}
