import {settingsTemplate} from './settings.template'
import {FormBlock} from '../../components/block/form-block'
import './settings.sass'
import '../change-password/change-password.sass'
import '../authorization/authotization.sass'
import {http} from '../../helpers/http/http'
import {UserResponse} from '../../models/api/user/user-response'
import {API} from '../../constants/api'
import {kebabToCamel} from '../../helpers/kebab-to-camel'
import {router} from '../../helpers/router/router-instance'
import {Pathname} from '../../models/enums/pathname'
import {API_IS_SUCK} from '../../constants/api-is-suck'

export class SettingsComponent extends FormBlock {
    fileInput: HTMLInputElement

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
        buttonValue: 'Change',
        pickerClass: 'hide'
    }) {
        super(context, settingsTemplate)

        http.get<UserResponse>(API.user)
            .then(response => {

                for (let [key, value] of Object.entries(response)) {
                    const camel = kebabToCamel(key)

                    if (key === 'avatar') {
                        value = API_IS_SUCK + value
                    }

                    this.setContext({[`${camel}Value`]: value})
                }
            })

        this.setContext({
            submit: this.settingsSubmit,
            showPicker: this.showPicker
        })

        setTimeout(() => this.fileInput = document.getElementById('fileInput') as HTMLInputElement)
    }

    showPicker = () => {
        this.fileInput.value = ''
        this.fileInput.click()
    }

    settingsSubmit = (event: Event) => {
        const object = this.submit(event)

        if (object !== null) {
            http.put(API.changeProfile, object)
                .then(() => router.go(Pathname.Slash))
        }
    }
}
