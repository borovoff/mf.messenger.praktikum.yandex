import {Templator} from '../../templator/templator'
import {settingsTemplate} from './settings.template'
import {FormBlock} from '../../form-block'

export class SettingsComponent extends FormBlock {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(settingsTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
