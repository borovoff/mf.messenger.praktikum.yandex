import {Templator} from '../../templator/templator'
import {settingsTemplate} from './settings.template'
import {FormBlock} from '../../components/form-block'
import './settings.sass'
import '../change-password/change-password.sass'
import '../authorization/authotization.sass'
import {http} from '../../helpers/http'
import {UserResponse} from '../../models/api/user/user-response'
import {API} from '../../constants/api'
import {kebabToCamel} from '../../helpers/kebab-to-camel'
import {router} from '../../helpers/router-instance'
import {Pathname} from '../../models/enums/pathname'

export class SettingsComponent extends FormBlock {
    constructor(context: Object = {
        firstNameName:  'First name',
        secondNameName: 'Second name',
        loginName: 'Login',
        emailName: 'Email',
        displayNameName: 'Display name',
        phoneName: 'Phone',
        button: {
            inner: 'base-button-back'
        },
        buttonValue: 'Change'
    }) {
        super(context)

        http.get<UserResponse>(API.user)
            .then(response => {

                for (const [key, value] of Object.entries(response)) {
                    const camel = kebabToCamel(key)

                    this.setContext({[`${camel}Value`]: value})
                }
            })

        this.setContext({
            submit: this.settingsSubmit
        })
    }

    render() {
        const templator = new Templator(settingsTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }

    settingsSubmit = (event: Event) => {
        const object = this.submit(event)

        if (object !== null) {
            http.put(API.changeProfile, object)
                .then(() => router.go(Pathname.Slash))
        }
    }
}
