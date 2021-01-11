import {chatImageTemplate} from './chat-image.template'
import {Block} from '../../../block'
import './chat-image.sass'
import {ChatsResponse} from '../../../models/api/chat/chats-response'

export class ChatImageComponent extends Block {
    private colors = [
        '#cc90e2',
        '#80d066',
        '#ecd074',
        '#6fb1e4',
        '#e57979',
        '#f98bae',
        '#73cdd0',
        '#fba76f'
    ]

    constructor(context: Object = {
        circleClass: 'letter-circle',
        imgClass: 'hide'
    }) {
        super(context, chatImageTemplate)
    }

    setContext(context: any) {
        if (context.hasOwnProperty('chat') && context.chat) {
            this.setInitials(context.chat)
        }

        super.setContext(context)
    }

    setInitials(chat: ChatsResponse) {
        const colorNumber = Math.abs(chat.id) % 8

        super.setContext({
            circleStyle: `background-color: ${this.colors[colorNumber]}`,
            circleText: this.getInitials(chat.title)
        })
    }

    getInitials(title: string): string {
        const array = title.split(' ')

        const second = array[1]

        return this.getLetter(array[0]) + (second ? this.getLetter(second) : '')
    }

    getLetter(word: string) {
        const l = word.charAt(0).toUpperCase()

        return l.toLowerCase() !== l ? l : ''
    }
}
