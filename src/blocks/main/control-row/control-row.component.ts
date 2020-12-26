import {Templator} from '../../../templator/templator'
import {Block} from '../../../block'
import {controlRowTemplate} from './control-row.template'
import './control-row.sass'

export class ControlRowComponent extends Block {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(controlRowTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
