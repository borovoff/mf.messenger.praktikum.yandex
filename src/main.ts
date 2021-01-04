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


new ComponentRegistry()

http.get<UserResponse>(API.user)
    .then(response => console.log(response))
    .catch(error => console.log('error: ' + error))

router
    .use(Pathname.Main, MainComponent)
    .use(Pathname.Slash, MainComponent)
    .use(Pathname.Index, MainComponent)
    .use(Pathname.Authorization, AuthorizationComponent)
    .use(Pathname.Registration, RegistrationComponent)
    .use(Pathname.ChangePassword, ChangePasswordComponent)
    .use(Pathname.Settings, SettingsComponent)
    .start()

