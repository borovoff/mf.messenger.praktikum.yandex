import {Templator} from '../../templator/templator'
import {Block} from '../../block'
import {photoPickerTemplate} from './photo-picker.template'

export class PhotoPickerComponent extends Block {
    constructor(context?: Object) {
        super(context)
    }

    render() {
        const templator = new Templator(photoPickerTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}

customElements.define('app-photo-picker', PhotoPickerComponent)
