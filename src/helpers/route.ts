import {render} from './render'
import {Block} from '../block'

export class Route {
    _pathname: string
    _blockClass: typeof Block
    _block: Block
    _rootQuery: string

    constructor(pathname: string, view: typeof Block, rootQuery: string) {
        this._pathname = pathname
        this._blockClass = view
        this._rootQuery = rootQuery
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname
            this.render()
        }
    }

    leave() {
        if (this._block) {
            this._block.hide()
        }
    }

    match(pathname: string) {
        return pathname === this._pathname
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass()
            render(this._rootQuery, this._block)

            return
        }

        this._block.show()
    }
}
