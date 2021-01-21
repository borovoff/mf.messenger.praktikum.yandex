import {ChatsResponse} from '../../models/api/chat/chats-response'
import {API} from '../../constants/api'
import {HTTPTransport} from '../http/http-transport'
import {ElementProperties} from '../../models/types/element-properties'
import {UserResponse} from '../../models/api/user/user-response'
import {ChatsMessagesTokenResponse} from '../../models/api/chat/chats-message-token-response'

export class ApiService {
    private http = new HTTPTransport()

    get chats() {
        return this.http.get<ChatsResponse[]>(API.chats)
    }

    get logout() {
        return this.http.post(API.logout)
    }

    get user() {
        return this.http.get<UserResponse>(API.user)
    }

    signin(object: ElementProperties) {
        return this.http.post(API.signin, object)
    }

    signup(object: ElementProperties) {
        return this.http.post(API.signup, object)
    }

    changePassword(object: ElementProperties) {
        return this.http.put(API.changePassword, object)
    }

    changeProfile(object: ElementProperties) {
        return this.http.put(API.changeProfile, object)
    }

    chatUsers(addRequest: any) {
        return this.http.put(API.chatUsers, addRequest)
    }

    chat(object: ElementProperties) {
        return this.http.post(API.chats, object)
    }

    avatar(formData: FormData) {
        return this.http.put(API.userAvatar, formData)
    }

    deleteUser(addRequest: any) {
        return this.http.delete(API.chatUsers, addRequest)
    }

    search(object: ElementProperties) {
        return this.http.post<UserResponse[]>(API.getByLogin, object)
    }

    token(id: number) {
        return this.http.post<ChatsMessagesTokenResponse>(API.getToken(id))
            .then(result => result.token)
    }
}
