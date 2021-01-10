import {Pathname} from './models/enums/pathname'
import {AuthorizationComponent} from './blocks/authorization/authorization.component'
import {RegistrationComponent} from './blocks/registration/registration.component'
import {MainComponent} from './blocks/main/main.component'
import {SettingsComponent} from './blocks/settings/settings.component'
import {ChangePasswordComponent} from './blocks/change-password/change-password.component'
import {ComponentRegistry} from './component-registry'
import './app.sass'
import {router} from './helpers/router-instance'
import {http} from './helpers/http'
import {UserResponse} from './models/api/user/user-response'
import {API} from './constants/api'
import {CreateChatComponent} from './blocks/create-chat/create-chat.component'


new ComponentRegistry()

http.get<UserResponse>(API.user)
    .then(response => console.log(response))
    .catch(error => console.log('error: ' + error))

router
    .use(Pathname.Slash, MainComponent)
    .use(Pathname.Authorization, AuthorizationComponent)
    .use(Pathname.Registration, RegistrationComponent)
    .use(Pathname.ChangePassword, ChangePasswordComponent)
    .use(Pathname.Settings, SettingsComponent)
    .use(Pathname.CreateChat, CreateChatComponent)
    .start()

