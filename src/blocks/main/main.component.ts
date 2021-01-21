import {mainTemplate} from './main.template'
import {Block} from '../../components/block/block'
import './main.sass'
import {ChatComponent} from './chat/chat.component'
import {api} from '../../helpers/api/api'
import {ws} from '../../services/ws/ws'
import {MessageResponse} from '../../models/api/message/message-response'
import {user} from '../../helpers/user'
import {DateHelper} from '../../helpers/date/date-helper'


export class MainComponent extends Block {
    private currentChat?: ChatComponent
    messagesElement: HTMLElement

    constructor(context: Object = {
        messages: [
            {
                class: 'message stranger last first',
                content: 'Доброе утро ☀',
                time: '7:48',
                imgClass: 'hide'
            },
            {
                class: 'message my first',
                content: 'Доброе утро 🌞',
                time: '10:40',
                imgClass: 'check-img'
            },
            {
                class: 'message my',
                content: '😂',
                time: '11:04',
                imgClass: 'check-img'
            },
            {
                class: 'message my last',
                content: 'https://vm.tiktok.com/ZSb1AL1F/',
                time: '11:04',
                imgClass: 'check-img'
            },
            {
                class: 'message stranger first',
                content: 'Что-то пошло не так',
                time: '11:47',
                imgClass: 'hide'
            },
            {
                class: 'message stranger',
                content: '[Photo]',
                time: '13:38',
                imgClass: 'hide'
            },
            {
                class: 'message stranger last',
                content: '[Photo]',
                time: '13:39',
                imgClass: 'hide'
            },
            {
                class: 'message my last first',
                content: 'Это на ужин заберешь? )))',
                time: '13:58',
                imgClass: 'check-img'
            },
            {
                class: 'message stranger last first',
                content: 'Нет, тебе привезу, на борщ)',
                time: '13:59',
                imgClass: 'hide'
            },
            {
                class: 'message my last first',
                content: 'Второе тоже захвати ))',
                time: '14:07',
                imgClass: 'check-img'
            }
        ]
    }) {
        super(context, mainTemplate)

        this.setContext({
            chatClick: this.chatClick
        })

        this.hideMessages()

        window.addEventListener('click', () => {
            if (this.currentChat) {
                this.currentChat.classList.remove('chat_current')
                this.currentChat = undefined
            }
        })
    }

    addToDom() {
        super.addToDom()

        api.chats.then(result => this.setContext({
            chats: result
        }))

        this.messagesElement = document.getElementById('messages') as HTMLElement
    }

    setCurrent = (target: ChatComponent) => {
        this.currentChat = target
        target.classList.add('chat_current')
        const context = target.context
        const chat = context.chat
        this.setContext({
            chatTitle: context.chatTitle,
            currentChat: chat,
            beforeClass: 'hide',
            headerClass: 'chat-header',
            messagesClass: 'messages-component',
            inputClass: 'input-component'
        })

        const chatId = chat.id
        api.token(chatId).then(token => {
            ws
                .init(chatId, token)
                .listener('message', (event: MessageEvent) => {
                    let data = JSON.parse(event.data)

                    if (Array.isArray(data)) {
                        data = data as MessageResponse[]
                        if (data.length > 0) {
                            this.addMessages(data)
                        } else {
                            this.setContext({
                                messages: []
                            })
                        }

                    } else {
                        data = data as MessageResponse
                        data.user_id = data.userId // 🔥
                        const messages = this.context.messages
                        messages.push(data)
                        messages.reverse()
                        this.addMessages(messages)
                    }
                })
                .listener('close', () => this.hideMessages())
        })
    }

    hideMessages() {
        this.setContext({
            headerClass: 'hide',
            messagesClass: 'hide',
            inputClass: 'hide',
            beforeClass: 'before-messages'
        })
    }

    addMessages(messages: MessageResponse[], last = true) {
        messages.forEach(message =>
            message.timeFormatted = DateHelper.getTimeMessage(message.time))

        for (let i = 0; i < messages.length - 1; i++) {
            const message = messages[i]

            const {classList, isOutgoing} = this.initClassList(message, last)
            const next = i + 1
            last = false

            const nextMessage = messages[next]

            const nextIsOutgoing = nextMessage.user_id === user.id
            if (isOutgoing !== nextIsOutgoing) {
                last = true
                classList.push('first')
            }

            message.class = classList.join(' ')
        }

        const message = messages[messages.length - 1]
        const {classList} = this.initClassList(message, last)
        classList.push('first')
        message.class = classList.join(' ')

        messages.reverse()

        this.setContext({
            messages: messages
        })

        this.messagesElement.scrollTo(0, this.messagesElement.scrollHeight)
    }

    initClassList(message: MessageResponse, last: boolean) {
        const classList = ['message']
        const isOutgoing = message.user_id === user.id
        message.imgClass = isOutgoing ? 'check-img' : 'hide'

        classList.push(isOutgoing ? 'my' : 'stranger')

        if (last) {
            classList.push('last')
        }

        return {classList, isOutgoing}
    }

    chatClick = (event: MouseEvent) => {
        const target = event.target
        if (target instanceof ChatComponent) {
            setTimeout(() => this.setCurrent(target))
        }
    }
}
