import {ErrorPopupComponent} from '../blocks/error-popup/error-popup.component'

export function showError(context: any) {
    let errorPopup = document.body.getElementsByTagName('app-error-popup')[0] as ErrorPopupComponent

    if (!errorPopup) {
        errorPopup = new ErrorPopupComponent()
        document.body.appendChild(errorPopup)
    }

    errorPopup.setContext(context)
}
