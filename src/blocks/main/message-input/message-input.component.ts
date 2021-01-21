import {Block} from '../../../components/block/block'
import {messageInputTemplate} from './message-input.template'
import './message-input.sass'
import {ws} from '../../../services/ws/ws'

export class MessageInputComponent extends Block {
    constructor(context: Object = {
        outerMicro: 'input-microphone',
        innerMicro: 'input-microphone-img',
        buttonType: 'submit'
    }) {
        super(context, messageInputTemplate)

        this.setContext({
            submit: this.submit
        })
    }

    submit = (event: Event) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const input = form.getElementsByTagName('input')[0]

        const message = input.value
        if (message) {
            ws.send({
                content: message,
                type: 'message'
            })
            input.value = ''
        }
    }
}
