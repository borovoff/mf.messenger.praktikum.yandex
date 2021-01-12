import './chat-users.sass'
import {chatUsersTemplate} from './chat-users.template'
import {FormBlock} from '../../components/form-block'
import {http} from '../../helpers/http'
import {API} from '../../constants/api'
import {router} from '../../helpers/router-instance'
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
        const object = this.submit(event)

        if (object !== null) {
            object.chatId = router.history.state.chatId
            http.put(API.chatUsers, object)
                .then(() => router.go(Pathname.Slash))
        }
    }
}
