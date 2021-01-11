import {BASE_PATH} from './base-path'

export class API {
    static signup = `${BASE_PATH}auth/signup`
    static signin = BASE_PATH + 'auth/signin'
    static user = BASE_PATH + 'auth/user'
    static logout = BASE_PATH + 'auth/logout'

    static chats = BASE_PATH + 'chats'
    static getChatUsers(id: number): string {
        return `${BASE_PATH}chats/${id}/users`
    }
    static messageCount(id: number): string {
        return `${BASE_PATH}chats/new/${id}`
    }
    static chatAvatar = `${BASE_PATH}chats/avatar`
    static chatUsers = `${BASE_PATH}chats/users`
    static getToken(id: number): string {
        return `${BASE_PATH}chats/token/${id}`
    }

    static changeProfile = `${BASE_PATH}user/profile`
    static userAvatar = `${BASE_PATH}user/profile/avatar`
    static changePassword = `${BASE_PATH}user/password`
    static getUser(id: number): string {
        return `${BASE_PATH}user/${id}`
    }
    static getByLogin = `${BASE_PATH}user/search`
}
