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
    static avatar = `${BASE_PATH}chats/avatar`
    static chatUsers = 'chats/users'
    static getToken(id: number): string {
        return `chats/token/${id}`
    }

    static changeProfile = 'user/profile'
    static changeAvatar = 'user/profile/avatar'
    static changePassword = 'user/password'
    static getUser(id: number): string {
        return `user/${id}`
    }
    static getByLogin = 'user/search'
}
