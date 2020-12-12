import {Block} from './block'
import {InputType} from './models/enums/input-type'

type NullableString = string | null

export class FormBlock extends Block {
    constructor(context?: Object) {
        super(context)

        this.setContext({
            submit: this.submit,
            blur: this.redBorder,
            focus: this.redBorder
        })
    }

    minLength = (value: string): NullableString => {
        return value.length > 4 ? null : 'Field should contain minimum 5 characters'
    }

    checkEmail = (value: string): NullableString => {
        return /\S+@\S+\.\S+/.test(value) ? null : 'Not valid email address'
    }

    empty = (value: string): NullableString => {
        return value ? null : 'Field can\'t be empty'
    }

    setBorderElement = (element: HTMLInputElement) => {
        const caption = element.previousElementSibling as HTMLElement

        if (!caption) {
            return
        }

        let error = null
        let validations

        switch (element.type as InputType) {
            case InputType.Password:
                validations = [this.empty, this.minLength]
                break
            case InputType.Email:
                validations = [this.empty, this.minLength, this.checkEmail]
                break
            case InputType.Text:
            default:
                validations = [this.empty]
                break
        }

        for (const validation of validations) {
            error = validation(element.value)

            if (error) {
                break
            }
        }

        const key = 'storedCaption'
        const dataset = caption.dataset

        if (error) {
            element.classList.add('invalid-input')

            if (!dataset[key]) {
                dataset[key] = caption.innerText
            }

            caption.textContent = error
            caption.classList.add('invalid-caption')
        } else {
            element.classList.remove('invalid-input')
            caption.textContent = dataset[key] as string
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
