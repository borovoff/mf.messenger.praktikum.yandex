import {Block} from '../../components/block/block'
import {photoPickerTemplate} from './photo-picker.template'
import './photo-picker.sass'
import {api} from '../../helpers/api/api'

export class PhotoPickerComponent extends Block {
    constructor(context: Object = {
        checkButton: {
            outer: 'check-picker',
            inner: 'blue-button-img base-button-check'
        },
        closeButton: {
            outer: 'close-picker',
            inner: 'base-button-close'
        },
        imgSrc: 'assets/photos/cat.jpg'
    }) {
        super(context, photoPickerTemplate)

        this.addEventListener('click', (event: MouseEvent) => {
            if (event.target instanceof PhotoPickerComponent) {
                this.hidePicker()
            }
        })

        this.setContext({
            hidePicker: this.hidePicker
        })

        setTimeout(this.setFileInput)
    }

    sendPhoto = (file: File) => {
        const formData = new FormData()
        formData.append('avatar', file)
        api.avatar(formData).then(() => this.hidePicker())
    }

    hidePicker = () => {
        this.className = 'hide'
    }

    setFileInput = () => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement

        fileInput.onchange = () => {
            this.className = 'cancel-area flex-center'

            const files = fileInput.files
            if (files) {
                const file = files[0]
                const reader = new FileReader()

                reader.onload = (event) => {
                    // @ts-ignore
                    const imgSrc = event.target.result
                    this.setContext({
                        imgSrc: imgSrc,
                        sendPhoto: () => this.sendPhoto(file),
                    })
                }

                reader.readAsDataURL(file)
            }
        }
    }
}
