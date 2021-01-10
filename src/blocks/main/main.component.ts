import {Templator} from '../../templator/templator'
import {mainTemplate} from './main.template'
import {Block} from '../../block'
import './main.sass'
import {http} from '../../helpers/http'
import {API} from '../../constants/api'
import {ChatsResponse} from '../../models/api/chat/chats-response'
import {ChatComponent} from './chat/chat.component'

export class MainComponent extends Block {
    private currentChat?: ChatComponent

    constructor(context: Object = {
        messages: [
            {
                class: 'message stranger last first',
                text: 'Доброе утро ☀',
                time: '7:48',
                imgClass: 'hide'
            },
            {
                class: 'message my first',
                text: 'Доброе утро 🌞',
                time: '10:40',
                imgClass: 'check-img'
            },
            {
                class: 'message my',
                text: '😂',
                time: '11:04',
                imgClass: 'check-img'
            },
            {
                class: 'message my last',
                text: 'https://vm.tiktok.com/ZSb1AL1F/',
                time: '11:04',
                imgClass: 'check-img'
            },
            {
                class: 'message stranger first',
                text: 'Что-то пошло не так',
                time: '11:47',
                imgClass: 'hide'
            },
            {
                class: 'message stranger',
                text: '[Photo]',
                time: '13:38',
                imgClass: 'hide'
            },
            {
                class: 'message stranger last',
                text: '[Photo]',
                time: '13:39',
                imgClass: 'hide'
            },
            {
                class: 'message my last first',
                text: 'Это на ужин заберешь? )))',
                time: '13:58',
                imgClass: 'check-img'
            },
            {
                class: 'message stranger last first',
                text: 'Нет, тебе привезу, на борщ)',
                time: '13:59',
                imgClass: 'hide'
            },
            {
                class: 'message my last first',
                text: 'Второе тоже захвати ))',
                time: '14:07',
                imgClass: 'check-img'
            }
        ]
    }) {
        super(context)

        http.get<ChatsResponse[]>(API.chats).then(result => this.setContext({
            chats: result
        }))

        this.setContext({
            chatClick: this.chatClick
        })

        window.addEventListener('click', () => {
            if (this.currentChat) {
                this.currentChat.classList.remove('chat_current')
                this.currentChat = undefined
            }
        })
    }

    render() {
        const templator = new Templator(mainTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }

    setCurrent = (target: ChatComponent) => {
        this.currentChat = target
        target.classList.add('chat_current')
        this.setContext({
            chatTitle: target.context.chatTitle
        })
    }

    chatClick = (event: MouseEvent) => {
        const target = event.target
        if (target instanceof ChatComponent) {
            setTimeout(() => this.setCurrent(target))
        }
    }
}
