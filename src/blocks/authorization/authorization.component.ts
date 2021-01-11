import {authorizationTemplate} from './authorization.template'
import {FormBlock} from '../../components/form-block'
import './authotization.sass'
import {router} from '../../helpers/router-instance'
import {Pathname} from '../../models/enums/pathname'
import {http} from '../../helpers/http'
import {API} from '../../constants/api'

export class AuthorizationComponent extends FormBlock {
    constructor(context: Object = {
        name: 'Login',
        password: 'Password',
        buttonValue: 'Authorization',
        registration: 'Registration'
    }) {
        super(context, authorizationTemplate)

        this.setContext({
            registrationClick: this.registrationClick,
            submit: this.authSubmit
        })
    }

    registrationClick = () => {
        router.go(Pathname.Registration)
    }

    authSubmit = (event: Event) => {
        const object = this.submit(event)

        if (object !== null) {
            http.post(API.signin, object)
                .then(() => router.go(Pathname.Slash))
        }
    }
}
