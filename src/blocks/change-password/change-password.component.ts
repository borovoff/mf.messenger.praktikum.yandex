import {changePasswordTemplate} from './change-password.template'
import {FormBlock} from '../../components/block/form-block'
import './change-password.sass'
import '../authorization/authotization.sass'
import {http} from '../../helpers/http/http'
import {API} from '../../constants/api'
import {router} from '../../helpers/router/router-instance'
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
        super(context, changePasswordTemplate)

        this.setContext({
            submit: this.passSubmit
        })
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
