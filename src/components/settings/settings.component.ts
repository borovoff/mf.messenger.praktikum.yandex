import {Templator} from '../../templator/templator'
import {Block} from '../../block'
import {settingsTemplate} from './settings.template'

export class SettingsComponent extends Block {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(settingsTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}

customElements.define('app-settings', SettingsComponent)
