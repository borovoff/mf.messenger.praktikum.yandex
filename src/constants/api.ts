import {API_PATH} from './api-path'

export class API {
    static signup = `${API_PATH}auth/signup`
    static signin = API_PATH + 'auth/signin'
    static user = API_PATH + 'auth/user'
    static logout = API_PATH + 'auth/logout'

    static chats = API_PATH + 'chats'
    static getChatUsers(id: number): string {
        return `${API_PATH}chats/${id}/users`
    }
    static messageCount(id: number): string {
        return `${API_PATH}chats/new/${id}`
    }
    static chatAvatar = `${API_PATH}chats/avatar`
    static chatUsers = `${API_PATH}chats/users`
    static getToken(id: number): string {
        return `${API_PATH}chats/token/${id}`
    }

    static changeProfile = `${API_PATH}user/profile`
    static userAvatar = `${API_PATH}user/profile/avatar`
    static changePassword = `${API_PATH}user/password`
    static getUser(id: number): string {
        return `${API_PATH}user/${id}`
    }
    static getByLogin = `${API_PATH}user/search`
}
