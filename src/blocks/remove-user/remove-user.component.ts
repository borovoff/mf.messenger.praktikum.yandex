import './remove-user.sass'
import {removeUserTemplate} from './remove-user.template'
import {FormBlock} from '../../components/form-block'
import {http} from '../../helpers/http'
import {API} from '../../constants/api'
import {router} from '../../helpers/router-instance'
import {Pathname} from '../../models/enums/pathname'

export class RemoveUserComponent extends FormBlock {
    constructor(context: Object = {
        login: 'Login',
        addUser: 'Remove user'
    }) {
        super(context, removeUserTemplate)

        this.setContext({
            submit: this.userSubmit
        })
    }

    userSubmit = (event: Event) => {
        const object = this.submit(event)

        if (object !== null) {
            http.put(API.chatUsers, object)
                .then(() => router.go(Pathname.Slash))
        }
    }
}
