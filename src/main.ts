import {Pathname} from './models/enums/pathname'
import {AuthorizationComponent} from './blocks/authorization/authorization.component'
import {RegistrationComponent} from './blocks/registration/registration.component'
import {MainComponent} from './blocks/main/main.component'
import {SettingsComponent} from './blocks/settings/settings.component'
import {ChangePasswordComponent} from './blocks/change-password/change-password.component'
import {ComponentRegistry} from './component-registry'
import './app.sass'
import {router} from './helpers/router/router-instance'
import {CreateChatComponent} from './blocks/create-chat/create-chat.component'
import {ChatUsersComponent} from './blocks/chat-users/chat-users.component'
import {RemoveUserComponent} from './blocks/remove-user/remove-user.component'
import {api} from './helpers/api/api'
import {user} from './helpers/user'


new ComponentRegistry()

api.user
    .then(response => {
        console.log(response)
        user.id = response.id
    })
    .catch(error => console.log('error: ' + error))

router
    .use(Pathname.Slash, MainComponent)
    .use(Pathname.Authorization, AuthorizationComponent)
    .use(Pathname.Registration, RegistrationComponent)
    .use(Pathname.ChangePassword, ChangePasswordComponent)
    .use(Pathname.Settings, SettingsComponent)
    .use(Pathname.CreateChat, CreateChatComponent)
    .use(Pathname.ChatUsers, ChatUsersComponent)
    .use(Pathname.RemoveUser, RemoveUserComponent)
    .start()


