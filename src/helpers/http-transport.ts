// @ts-nocheck

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

function queryStringify(data: Object) {
    let result = '?'

    for (const [key, value] of Object.entries(data)) {
        result += `${key}=${value}&`
    }

    return result.slice(0, -1)
}

export class HTTPTransport {
    get = (url, options = {}) => {
        url += queryStringify(options.data)

        return this.request(url, {...options, method: METHODS.GET}, options.timeout)
    }

    post = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout)
    }

    put = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout)
    }

    delete = (url, options = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout)
    }

    request = (url, options, timeout = 5000) => {
        const {method, data} = options

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)

            xhr.onload = function() {
                resolve(xhr)
            }

            xhr.onabort = reject
            xhr.onerror = reject
            xhr.ontimeout = reject

            if (method === METHODS.GET || !data) {
                xhr.send()
            } else {
                xhr.send(data)
            }

            setTimeout(() => xhr.abort(), timeout)
        })
    }
}
