export function queryStringify(data: Object) {
    const result = Object.entries(data)
        .reduce((accumulator, [key, value]) =>
            accumulator + `${key}=${value}&`, '?')

    return result.slice(0, -1)
}
