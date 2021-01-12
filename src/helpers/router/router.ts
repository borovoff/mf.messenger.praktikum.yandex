import {Route} from '../route/route'
import {Block} from '../../components/block/block'
import {queryStringify} from '../query-stringify'

export class Router {
    routes: Route[] = []
    history = window.history
    _currentRoute?: Route
    _rootQuery: string

    static __instance: Router

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance
        }

        this._rootQuery = rootQuery

        Router.__instance = this
    }

    use(pathname: string, block: typeof Block): Router {
        const route = new Route(pathname, block, this._rootQuery)
        this.routes.push(route)

        return this
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            // @ts-ignore
            this._onRoute(event.currentTarget.location.pathname)
        }

        this._onRoute(window.location.pathname)
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname)

        if (route === undefined) {
            throw new Error('Route not found')
        }

        if (this._currentRoute) {
            this._currentRoute.leave()
        }

        this._currentRoute = route
        route.render()
    }

    go(pathname: string, data?: any) {
        const state = data ? queryStringify(data) : ''

        this.history.pushState(data, '', pathname + state)
        this._onRoute(pathname)
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname))
    }
}


