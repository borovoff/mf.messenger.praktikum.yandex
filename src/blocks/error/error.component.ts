import {Block} from '../../components/block/block'
import {errorTemplate} from './error.template'

export class ErrorComponent extends Block {
    constructor(context: Object) {
        super(context, errorTemplate)
    }
}
