import {user} from '../../helpers/user'
import {ElementProperties} from '../../models/types/element-properties'

export class WebSocketService {
    socket: WebSocket

    constructor() {
    }

    init(chatId: number, token: string) {
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${token}`)

        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено')

            this.socket.send(JSON.stringify({
                content: '0',
                type: 'get old',
            }))
        })

        this.socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто')
            } else {
                console.log('Обрыв соединения')
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`)
        })

        this.socket.addEventListener('message', event => {
            console.log('Получены данные', event.data)
        })

        this.socket.addEventListener('error', event => {
            console.log('Ошибка', event)
        })

        return this
    }

    listener(type: string, fn: (event: Event) => void) {
        this.socket.addEventListener(type, fn)

        return this
    }

    send(object: ElementProperties) {
        this.socket.send(JSON.stringify(object))
    }
}
