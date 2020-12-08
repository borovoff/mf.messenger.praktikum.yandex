import {Pathname} from './models/enums/pathname'
import {AuthorizationComponent} from './components/authorization/authorization.component'

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
            break
        case Pathname.Main:
            break
        case Pathname.Settings:
            break
        case Pathname.PhotoPicker:
            break
        case Pathname.ChangePassword:
            break
        case Pathname.NotFound:
            break
        case Pathname.HyperError:
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

