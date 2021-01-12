import './remove-user.sass'
import {removeUserTemplate} from './remove-user.template'
import {FormBlock} from '../../components/block/form-block'
import {http} from '../../helpers/http/http'
import {API} from '../../constants/api'
import {router} from '../../helpers/router/router-instance'
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
        const fn = (addRequest: any) => http.delete(API.chatUsers, addRequest)
            .then(() => router.go(Pathname.Slash))

        this.findSubmit(event, fn)
    }
}
