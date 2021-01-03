import {Pathname} from './models/enums/pathname'
import {AuthorizationComponent} from './blocks/authorization/authorization.component'
import {ErrorComponent} from './blocks/error/error.component'
import {RegistrationComponent} from './blocks/registration/registration.component'
import {MainComponent} from './blocks/main/main.component'
import {SettingsComponent} from './blocks/settings/settings.component'
import {PhotoPickerComponent} from './blocks/photo-picker/photo-picker.component'
import {ChangePasswordComponent} from './blocks/change-password/change-password.component'
import {ComponentRegistry} from './component-registry'
import './app.sass'

const ul = document.getElementById('ul') as HTMLElement
const main = document.getElementById('main') as HTMLElement

new ComponentRegistry()

const changePage = (pathname: Pathname | string) => {
    let element: HTMLElement
    ul.classList.add('hide')

    while (main.childElementCount > 1) {
        (main.lastChild as HTMLElement).remove()
    }

    switch (pathname) {
        case Pathname.Authorization:
            element = new AuthorizationComponent({
                name: 'Login',
                password: 'Password',
                buttonValue: 'Authorization'
            })
            break
        case Pathname.Registration:
            element = new RegistrationComponent({
                firstName: 'First name',
                secondName: 'Second name',
                login: 'Login',
                email: 'Email',
                password: 'Password',
                phone: 'Phone',
                buttonValue: 'Registration'
            })
            break
        case Pathname.ChangePassword:
            element = new ChangePasswordComponent({
                button: {
                    inner: 'base-button-back'
                },
                oldPassword: 'Old password',
                newPassword: 'New password',
                repeatPassword: 'Repeat password',
                buttonValue: 'Change'
            })
            break
        case Pathname.Settings:
            element = new SettingsComponent({
                firstName: 'First name',
                secondName: 'Second name',
                login: 'Login',
                email: 'Email',
                displayName: 'Display name',
                phone: 'Phone',
                button: {
                    inner: 'base-button-back'
                },
                buttonValue: 'Change'
            })
            break
        case Pathname.Main:

            element = new MainComponent({
                outer: {
                    menu: 'menu-button',
                    micro: 'input-microphone'
                },
                inner: {
                    search: 'base-button-search',
                    more: 'base-button-more',
                    menu: 'base-button-menu',
                    micro: 'input-microphone-img'
                },
                img: {
                    chat: 'chat-image',
                    header: 'chat-image chat-header-img'
                },
                messages: [
                    {
                        class: 'message stranger last first',
                        text: 'Доброе утро ☀',
                        time: '7:48',
                        imgClass: 'hide'
                    },
                    {
                        class: 'message my first',
                        text: 'Доброе утро 🌞',
                        time: '10:40',
                        imgClass: 'check-img'
                    },
                    {
                        class: 'message my',
                        text: '😂',
                        time: '11:04',
                        imgClass: 'check-img'
                    },
                    {
                        class: 'message my last',
                        text: 'https://vm.tiktok.com/ZSb1AL1F/',
                        time: '11:04',
                        imgClass: 'check-img'
                    },
                    {
                        class: 'message stranger first',
                        text: 'Что-то пошло не так',
                        time: '11:47',
                        imgClass: 'hide'
                    },
                    {
                        class: 'message stranger',
                        text: '[Photo]',
                        time: '13:38',
                        imgClass: 'hide'
                    },
                    {
                        class: 'message stranger last',
                        text: '[Photo]',
                        time: '13:39',
                        imgClass: 'hide'
                    },
                    {
                        class: 'message my last first',
                        text: 'Это на ужин заберешь? )))',
                        time: '13:58',
                        imgClass: 'check-img'
                    },
                    {
                        class: 'message stranger last first',
                        text: 'Нет, тебе привезу, на борщ)',
                        time: '13:59',
                        imgClass: 'hide'
                    },
                    {
                        class: 'message my last first',
                        text: 'Второе тоже захвати ))',
                        time: '14:07',
                        imgClass: 'check-img'
                    }
                ]
            })
            break
        case Pathname.PhotoPicker:
            element = new PhotoPickerComponent({
                checkButton: {
                    outer: 'check-picker',
                    inner: 'blue-button-img base-button-check'
                },
                closeButton: {
                    outer: 'close-picker',
                    inner: 'base-button-close'
                }
            })
            break
        case Pathname.NotFound:
            element = new ErrorComponent({error: Pathname.NotFound})
            break
        case Pathname.HyperError:
            element = new ErrorComponent({error: Pathname.HyperError})
            break
        case Pathname.Index:
        case Pathname.Slash:
        default:
            ul.classList.remove('hide')
            element = document.createElement('div')
            element.textContent = 'Main'
            break
    }

    main.appendChild(element)
}

const loadPage = () => {
    const tokens = location.pathname.split('/')
    const t = tokens[tokens.length - 1]
    changePage(t)
}

loadPage()


const onNavigate = (pathname: string) => {
    console.log(pathname)
    // history.pushState(
    //     {},
    //     pathname,
    //     pathname ? pathname : '/'
    // )

    changePage(pathname)
}

// @ts-ignore
window.onNavigate = onNavigate

onpopstate = () => {
    loadPage()
}

