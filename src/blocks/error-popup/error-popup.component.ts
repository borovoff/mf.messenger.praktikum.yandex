import {Block} from '../../components/block/block'
import {errorPopupTemplate} from './error-popup.template'
import './error.sass'

export class ErrorPopupComponent extends Block {
    constructor(context: Object = {
        outerClass: 'hide'
    }) {
        super(context, errorPopupTemplate)

        this.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement

            if (target.classList.contains('cancel-area')) {
                target.className = 'hide'
            }
        })
    }
}
