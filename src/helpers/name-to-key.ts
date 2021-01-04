function deCapitalize(value: string) {
    return value.charAt(0).toLowerCase() + value.slice(1)
}

function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export function nameToKey(name: string): string {
    const array = name.split(' ')

    array[0] = deCapitalize(array[0])

    if (array.length === 1) {
        return array[0]
    }

    for (let i = 1; i < array.length; i++) {
        array[i] = capitalize(array[i])
    }

    return array.join()
}
