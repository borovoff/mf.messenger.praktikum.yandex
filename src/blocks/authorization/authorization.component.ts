import {Templator} from '../../templator/templator'
import {authorizationTemplate} from './authorization.template'
import {FormBlock} from '../../form-block'
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
        super(context)

        this.setContext({
            registrationClick: this.registrationClick,
            submit: this.authSubmit
        })
    }

    render() {
        const templator = new Templator(authorizationTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
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
