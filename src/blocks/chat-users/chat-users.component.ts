import './chat-users.sass'
import {chatUsersTemplate} from './chat-users.template'
import {FormBlock} from '../../components/block/form-block'
import {router} from '../../helpers/router/router-instance'
import {Pathname} from '../../models/enums/pathname'
import {api} from '../../helpers/api/api'

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
        const fn = (addRequest: any) => api.chatUsers(addRequest)
            .then(() => router.go(Pathname.Slash))

        this.findSubmit(event, fn)
    }
}
