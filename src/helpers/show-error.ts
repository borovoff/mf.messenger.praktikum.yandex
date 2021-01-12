import {ErrorPopupComponent} from '../blocks/error-popup/error-popup.component'

export function showError(error: string) {
    let errorPopup = document.body.getElementsByTagName('app-error-popup')[0] as ErrorPopupComponent

    if (!errorPopup) {
        errorPopup = new ErrorPopupComponent()
        document.body.appendChild(errorPopup)
    }

    const context = {
        errorJson: error,
        outerClass: 'cancel-area flex-center'
    }

    errorPopup.setContext(context)
}
