import {AuthorizationComponent} from './blocks/authorization/authorization.component'
import {InputComponent} from './components/input/input.component'
import {PasswordInputComponent} from './components/password-input/password-input.component'
import {IconButtonComponent} from './components/icon-button/icon-button.component'
import {ChatImageComponent} from './blocks/main/chat-image/chat-image.component'
import {ChatComponent} from './blocks/main/chat/chat.component'
import {MessageComponent} from './blocks/main/message/message.component'
import {RegistrationComponent} from './blocks/registration/registration.component'
import {ChangePasswordComponent} from './blocks/change-password/change-password.component'
import {SettingsComponent} from './blocks/settings/settings.component'
import {MainComponent} from './blocks/main/main.component'
import {PhotoPickerComponent} from './blocks/photo-picker/photo-picker.component'
import {ErrorComponent} from './blocks/error/error.component'
import {ButtonComponent} from './components/button/button.component'
import {EmailInputComponent} from './components/email-input/email-input.component'
import {ChatHeaderComponent} from './blocks/main/chat-header/chat-header.component'
import {MessageInputComponent} from './blocks/main/message-input/message-input.component'
import {ControlRowComponent} from './blocks/main/control-row/control-row.component'
import {ContextMenuComponent} from './components/context-menu/context-menu.component'
import {ContextMenuItemComponent} from './components/context-menu/context-menu-item/context-menu-item.component'
import {ChatsActionsComponent} from './blocks/main/chats-actions/chats-actions.component'
import {CreateChatComponent} from './blocks/create-chat/create-chat.component'
import {ChatUsersComponent} from './blocks/chat-users/chat-users.component'
import {RemoveUserComponent} from './blocks/remove-user/remove-user.component'

export class ComponentRegistry {
    constructor() {
        customElements.define('app-create-chat', CreateChatComponent)

        customElements.define('app-chat-users', ChatUsersComponent)
        customElements.define('app-remove-user', RemoveUserComponent)

        customElements.define('app-authorization', AuthorizationComponent)
        customElements.define('app-registration', RegistrationComponent)
        customElements.define('app-change-password', ChangePasswordComponent)
        customElements.define('app-settings', SettingsComponent)
        customElements.define('app-main', MainComponent)
        customElements.define('app-chat-header', ChatHeaderComponent)
        customElements.define('app-chats-actions', ChatsActionsComponent)
        customElements.define('app-message-input', MessageInputComponent)
        customElements.define('app-control-row', ControlRowComponent)

        customElements.define('app-photo-picker', PhotoPickerComponent)
        customElements.define('app-error', ErrorComponent)
        customElements.define('app-input', InputComponent)
        customElements.define('app-context-menu', ContextMenuComponent)
        customElements.define('app-context-menu-item', ContextMenuItemComponent)

        customElements.define('app-email-input', EmailInputComponent)
        customElements.define('app-password-input', PasswordInputComponent)
        customElements.define('app-button', ButtonComponent)
        customElements.define('app-icon-button', IconButtonComponent)
        customElements.define('app-chat-image', ChatImageComponent)
        customElements.define('app-chat', ChatComponent)
        customElements.define('app-message', MessageComponent)
    }
}
