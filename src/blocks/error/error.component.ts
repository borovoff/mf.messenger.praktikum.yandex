import {Block} from '../../block'
import {errorTemplate} from './error.template'

export class ErrorComponent extends Block {
    constructor(context: Object) {
        super(context, errorTemplate)
    }
}
