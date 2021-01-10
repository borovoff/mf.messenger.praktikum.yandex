import {Templator} from '../../templator/templator'
import {createChatTemplate} from './create-chat.template'
import {FormBlock} from '../../components/form-block'
import './crate-chat.sass'
import {router} from '../../helpers/router-instance'
import {Pathname} from '../../models/enums/pathname'
import {http} from '../../helpers/http'
import {API} from '../../constants/api'

export class CreateChatComponent extends FormBlock {
    constructor(context: Object = {
        name: 'Title',
        buttonValue: 'Create',
        button: {
            inner: 'base-button-back'
        },
    }) {
        super(context)

        this.setContext({
            submit: this.createChat
        })
    }

    render() {
        const templator = new Templator(createChatTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }

    createChat = (event: Event) => {
        const object = this.submit(event)

        if (object !== null) {
            http.post(API.chats, object)
                .then(() => router.go(Pathname.Slash))
        }
    }
}
