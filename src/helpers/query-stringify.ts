export function queryStringify(data: Object) {
    let result = '?'

    for (const [key, value] of Object.entries(data)) {
        result += `${key}=${value}&`
    }

    return result.slice(0, -1)
}
