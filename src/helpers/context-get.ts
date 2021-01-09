export function contextGet(path: string, context?: any, defaultValue?: string) {
    const keys = path.split('.')

    let result = context
    for (let key of keys) {
        result = result[key]

        if (result === undefined) {
            return defaultValue
        }
    }

    return result ?? defaultValue
}
