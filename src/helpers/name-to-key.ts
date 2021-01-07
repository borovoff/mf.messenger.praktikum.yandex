function deCapitalize(value: string) {
    return value.charAt(0).toLowerCase() + value.slice(1)
}

export function nameToKey(name: string): string {
    const array = name.split(' ')

    array[0] = deCapitalize(array[0])

    if (array.length === 1) {
        return array[0]
    }

    return array.join('_')
}
