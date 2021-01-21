import {changePasswordTemplate} from './change-password.template'
import {FormBlock} from '../../components/block/form-block'
import './change-password.sass'
import '../authorization/authotization.sass'
import {router} from '../../helpers/router/router-instance'
import {Pathname} from '../../models/enums/pathname'
import {kebabToCamel} from '../../helpers/kebab-to-camel'
import {api} from '../../helpers/api/api'

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

            api.changePassword(camelObject)
                .then(() => router.go(Pathname.Slash))
        }
    }
}
