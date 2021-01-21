import {createChatTemplate} from './create-chat.template'
import {FormBlock} from '../../components/block/form-block'
import './crate-chat.sass'
import {router} from '../../helpers/router/router-instance'
import {Pathname} from '../../models/enums/pathname'
import {api} from '../../helpers/api/api'

export class CreateChatComponent extends FormBlock {
    constructor(context: Object = {
        name: 'Title',
        buttonValue: 'Create',
        button: {
            inner: 'base-button-back'
        },
    }) {
        super(context, createChatTemplate)

        this.setContext({
            submit: this.createChat
        })
    }

    createChat = (event: Event) => {
        const object = this.submit(event)

        if (object !== null) {
            api.chat(object)
                .then(() => router.go(Pathname.Slash))
        }
    }
}
