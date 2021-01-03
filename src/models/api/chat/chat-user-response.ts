import {ChatUserRole} from './chat-user-role'

export class ChatUserResponse {
    id: number
    first_name: string
    second_name: string
    display_name: string
    login: string
    email: string
    phone: string
    avatar: string
    role: string
    Enum: ChatUserRole
}
