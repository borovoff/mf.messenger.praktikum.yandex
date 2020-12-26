import {Templator} from '../../templator/templator'
import {mainTemplate} from './main.template'
import {Block} from '../../block'
import './main.sass'

export class MainComponent extends Block {
    constructor(context: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(mainTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
