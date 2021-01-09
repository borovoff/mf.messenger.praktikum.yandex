import {firstCapitalize} from './first-capitalize'

export function kebabToCamel(value: string): string {
    const array = value.split('_')

    const length = array.length

    if (length > 1) {
        for (let i = 1; i < length; i++) {
            array[i] = firstCapitalize(array[i])
        }
    }

    return array.join('')
}
