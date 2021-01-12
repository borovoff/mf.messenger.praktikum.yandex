import {registrationTemplate} from './registration.template'
import {FormBlock} from '../../components/block/form-block'
import '../authorization/authotization.sass'
import {http} from '../../helpers/http/http'
import {API} from '../../constants/api'
import {Pathname} from '../../models/enums/pathname'
import {router} from '../../helpers/router/router-instance'

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
        super(context, registrationTemplate)

        this.setContext({
            submit: this.registrationSubmit
        })
    }

    registrationSubmit = (event: Event) => {
        const object = this.submit(event)

        if (object !== null) {
            http.post(API.signup, object)
                .then(() => router.go(Pathname.Slash))
        }
    }
}
