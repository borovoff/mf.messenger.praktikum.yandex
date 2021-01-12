import './chat-users.sass'
import {chatUsersTemplate} from './chat-users.template'
import {FormBlock} from '../../components/block/form-block'
import {http} from '../../helpers/http/http'
import {API} from '../../constants/api'
import {router} from '../../helpers/router/router-instance'
import {Pathname} from '../../models/enums/pathname'

export class ChatUsersComponent extends FormBlock {
    constructor(context: Object = {
        login: 'Login',
        addUser: 'Add user'
    }) {
        super(context, chatUsersTemplate)

        this.setContext({
            submit: this.userSubmit
        })
    }

    userSubmit = (event: Event) => {
        const fn = (addRequest: any) => http.put(API.chatUsers, addRequest)
            .then(() => router.go(Pathname.Slash))

        this.findSubmit(event, fn)
    }
}
