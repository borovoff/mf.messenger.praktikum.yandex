import {Block} from './block'
import {InputType} from '../../models/enums/input-type'
import {CustomNullable} from '../../models/types/custom-nullable'
import {ElementProperties} from '../../models/types/element-properties'
import {nameToKey} from '../../helpers/name-to-key'
import {router} from '../../helpers/router/router-instance'
import {http} from '../../helpers/http/http'
import {UserResponse} from '../../models/api/user/user-response'
import {API} from '../../constants/api'
import {showError} from '../../helpers/show-error'

type NullableString = string | null

export class FormBlock extends Block {
    constructor(context?: Object, template?: string) {
        super(context, template)

        this.setContext({
            submit: this.submit,
            blur: this.redBorder,
            focus: this.redBorder,
            backClick: this.backClick,
            buttonInner: 'base-button-back'
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

    verify = (element: HTMLInputElement): boolean => {
        const caption = element.previousElementSibling as HTMLElement

        if (!caption) {
            return true
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

            return false
        } else {
            element.classList.remove('invalid-input')
            caption.textContent = dataset[key] as string
            caption.classList.remove('invalid-caption')

            return true
        }
    }

    redBorder = (event: Event) => {
        const element = event.target as HTMLInputElement
        this.verify(element)
    }

    submit = (event: Event): CustomNullable<any> => {
        event.preventDefault()

        let verified = true
        const form = event.target as HTMLFormElement
        const inputs = form.getElementsByTagName('input')
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i]

            if (!this.verify(input)) {
                verified = false
            }
        }

        if (verified) {
            const formData = new FormData(form)
            const object: ElementProperties = {}
            formData.forEach((value, key) => object[nameToKey(key)] = value as string)

            return object
        }

        return null
    }

    findSubmit = (event: Event, fn: (parameter: any) => void) => {
        const object = this.submit(event)

        if (object !== null) {
            http.post<UserResponse[]>(API.getByLogin, object)
                .then(result => {
                    if (result.length === 0) {
                        showError('No results')
                        return
                    }

                    const firstResult = result[0]
                    const login = firstResult.login
                    if (login !== object.login) {
                        showError(`Not found this login, but found: ${login}`)
                        return
                    }

                    const addRequest = {
                        chatId: router.history.state.chatId,
                        users: [firstResult.id]
                    }

                    fn(addRequest)
                })

        }
    }

    backClick = () => {
        router.back()
    }
}
