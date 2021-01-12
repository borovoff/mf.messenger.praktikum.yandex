import {Block} from '../block/block'
import {iconButtonTemplate} from './icon-button.template'
import './icon-button.sass'

export class IconButtonComponent extends Block {
    constructor(context?: Object) {
        super(context, iconButtonTemplate)

        this.style.zIndex = '2'
    }
}
