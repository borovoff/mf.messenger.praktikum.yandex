import {beforeMessagesButtonTemplate} from './before-messages-button.template'
import './before-messages-button.sass'
import {Block} from '../../../../components/block/block'

export class BeforeMessagesButtonComponent extends Block {
    constructor(context?: Object) {
        super(context, beforeMessagesButtonTemplate)
    }
}
