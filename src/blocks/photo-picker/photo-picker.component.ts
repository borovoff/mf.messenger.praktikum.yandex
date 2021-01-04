import {Templator} from '../../templator/templator'
import {Block} from '../../block'
import {photoPickerTemplate} from './photo-picker.template'

export class PhotoPickerComponent extends Block {
    constructor(context: Object = {
        checkButton: {
            outer: 'check-picker',
            inner: 'blue-button-img base-button-check'
        },
        closeButton: {
            outer: 'close-picker',
            inner: 'base-button-close'
        }
    }) {
        super(context)
    }

    render() {
        const templator = new Templator(photoPickerTemplate, this, this.context)
        templator.newReplace()
        this.store = templator.store
    }
}
