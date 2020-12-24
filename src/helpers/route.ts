// @ts-nocheck

export class Route {
    _pathname
    _blockClass
    _block = null
    _props

    constructor(pathname, view, props) {
        this._pathname = pathname
        this._blockClass = view
        this._props = props
    }

    navigate(pathname) {
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

    match(pathname) {
        return pathname === this._pathname
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass()

            // TODO: add render
            render(this._props.rootQuery, this._block)
            return
        }

        this._block.show()
    }
}
