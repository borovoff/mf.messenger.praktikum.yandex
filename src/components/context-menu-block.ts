import {Block} from '../block'

export class ContextMenuBlock extends Block {
    private readonly menuClass: string

    constructor(menuClass: string, context?: Object, template?: string) {
        super(context, template)

        this.menuClass = menuClass

        window.addEventListener('click', () => {
            if (this.context.menuClass === menuClass) {
                this.setContext({
                    menuClass: 'hide'
                })
            }
        })

        this.setContext({
            showMenu: this.showMenu,
            menuClass: 'hide'
        })
    }

    showMenu = () => {
        setTimeout(() => this.setContext({
            menuClass: this.menuClass
        }))
    }
}
