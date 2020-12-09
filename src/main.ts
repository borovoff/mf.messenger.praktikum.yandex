import {Pathname} from './models/enums/pathname'
import {AuthorizationComponent} from './components/authorization/authorization.component'
import {ErrorComponent} from './components/error/error.component'
import {RegistrationComponent} from './components/registration/registration.component'
import {MainComponent} from './components/main/main.component'

const ul = document.getElementById('ul')
const main = document.getElementById('main')

const changePage = (pathname: Pathname | string) => {
    let element: HTMLElement
    ul.classList.add('hide')

    while (main.childElementCount > 1) {
        main.lastChild.remove()
    }

    switch (pathname) {
        case Pathname.Index:
        case Pathname.Slash:
            ul.classList.remove('hide')
            element = document.createElement('div')
            element.textContent = 'Main'
            break
        case Pathname.Authorization:
            element = new AuthorizationComponent({name: 'Login', password: 'Password'})
            break
        case Pathname.Registration:
            element = new RegistrationComponent({
                firstName: 'First name',
                secondName: 'Second name',
                login: 'Login',
                email: 'Email',
                password: 'Password',
                phone: 'Phone'
            })
            break
        case Pathname.Main:
            element = new MainComponent({
                outer: {
                    base: 'base-button',
                    menu: 'base-button menu-button',
                    micro: 'input-microphone'
                },
                inner: {
                    search: 'base-button-img base-button-search',
                    more: 'base-button-img base-button-more',
                    menu: 'base-button-img base-button-menu',
                    micro: 'input-microphone-img'
                },
                img: {
                    chat: 'chat-image',
                    header: 'chat-image chat-header-img'
                },
                message: {
                    class: 'message stranger last first',
                    text: 'Доброе утро ☀',
                    time: '7:48',
                    imgClass: 'hide'
                }
            })
            break
        case Pathname.Settings:
            break
        case Pathname.PhotoPicker:
            break
        case Pathname.ChangePassword:
            break
        case Pathname.NotFound:
            element = new ErrorComponent({error: Pathname.NotFound})
            break
        case Pathname.HyperError:
            element = new ErrorComponent({error: Pathname.HyperError})
            break
        default:
            break
    }

    main.appendChild(element)
}

const loadPage = () => {
    const tokens = location.pathname.split('/')
    const t = tokens[tokens.length - 1]
    console.log(t)
    changePage(t)
}

loadPage()


const onNavigate = (pathname) => {
    // console.log(pathname)
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

