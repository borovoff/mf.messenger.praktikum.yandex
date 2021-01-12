import {Block} from '../block/block'
import {buttonTemplate} from './button.template'
import './button.sass'

export class ButtonComponent extends Block {
    constructor(context?: Object) {
        super(context, buttonTemplate)
    }
}
