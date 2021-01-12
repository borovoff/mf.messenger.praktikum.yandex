import {beforeMessagesTemplate} from './before-messages.template'
import {Block} from '../../../components/block/block'
import './before-messages.sass'

export class BeforeMessagesComponent extends Block {
    constructor(context: Object = {
        buttons: [
            {
                class: 'bm-channel',
                caption: 'Channel'
            },
            {
                class: 'bm-group',
                caption: 'Group'
            },
            {
                class: 'bm-private',
                caption: 'Private'
            }
        ]
    }) {
        super(context, beforeMessagesTemplate)
    }
}
