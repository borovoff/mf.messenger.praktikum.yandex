import {Block} from './block'

export class FormBlock extends Block {
    constructor(context?: Object) {
        super(context)

        this.setContext({
            submit: this.submit,
            blur: this.redBorder,
            focus: this.redBorder
        })
    }

    setBorderElement = (element: HTMLInputElement) => {
        const value = element.value
        const caption = element.previousElementSibling as HTMLElement

        const empty = value ? false : 'Field can\'t be empty'

        if (empty) {
            element.classList.add('invalid-input')
            caption.classList.add('invalid-caption')
        } else {
            element.classList.remove('invalid-input')
            caption.classList.remove('invalid-caption')
        }
    }

    redBorder = (event: Event) => {
        const element = event.target as HTMLInputElement
        this.setBorderElement(element)
    }

    submit = (event: Event) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const inputs = form.getElementsByTagName('input')
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i]

            this.setBorderElement(input)
        }
    }
}
