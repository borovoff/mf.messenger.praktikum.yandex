// @ts-nocheck

import {Route} from './route'

export class Router {
    routes = []
    history = window.history
    _currentRoute = null
    _rootQuery

    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance
        }

        this._rootQuery = rootQuery

        Router.__instance = this
    }

    use(pathname, block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery})
        this.routes.push(route)
    }

    start() {
        window.onpopstate = event => {
            this._onRoute(event.currentTarget.location.pathname)
        }

        this._onRoute(window.location.pathname)
    }

    _onRoute(pathname) {
        const route = this.getRoute(pathname)

        if (!route) {
            this._currentRoute.leave()
        }

        this._currentRoute = route
        route.render(route, pathname)
    }

    go(pathname) {
        this.history.pushState({}, "", pathname)
        this._onRoute(pathname)
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }

    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname))
    }
}
