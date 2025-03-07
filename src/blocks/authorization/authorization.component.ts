import {authorizationTemplate} from './authorization.template'
import {FormBlock} from '../../components/block/form-block'
import './authotization.sass'
import {router} from '../../helpers/router/router-instance'
import {Pathname} from '../../models/enums/pathname'
import {api} from '../../helpers/api/api'

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
            api.signin(object)
                .then(() => router.go(Pathname.Slash))
        }
    }
}
