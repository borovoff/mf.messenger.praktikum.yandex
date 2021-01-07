import {Templator} from '../../templator/templator'
import {registrationTemplate} from './registration.template'
import {FormBlock} from '../../form-block'
import '../authorization/authotization.sass'
import {http} from '../../helpers/http'
import {API} from '../../constants/api'
import {Pathname} from '../../models/enums/pathname'
import {router} from '../../helpers/router-instance'

export class RegistrationComponent extends FormBlock {
    constructor(context: Object = {
        firstName: 'First name',
        secondName: 'Second name',
        login: 'Login',
        email: 'Email',
        password: 'Password',
        phone: 'Phone',
        buttonValue: 'Registration'
    }) {
        super(context)

        this.setContext({
            submit: this.registrationSubmit
        })
    }

    render() {
        const templator = new Templator(registrationTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }

    registrationSubmit = (event: Event) => {
        const object = this.submit(event)

        if (object !== null) {
            http.post(API.signup, object)
                .then(() => router.go(Pathname.Index))
        }
    }
}
