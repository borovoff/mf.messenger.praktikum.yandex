import {router} from './router-instance'
import {Pathname} from '../models/enums/pathname'

enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

interface RequestOptions {
    data?: Object
    method: Method
}

function queryStringify(data: Object) {
    let result = '?'

    for (const [key, value] of Object.entries(data)) {
        result += `${key}=${value}&`
    }

    return result.slice(0, -1)
}

export class HTTPTransport {
    get<T>(url: string, data?: Object) {
        if (data) {
            url += queryStringify(data)
        }

        return this.request<T>(url, {data, method: Method.GET})
    }

    post<T>(url: string, data?: Object) {
        return this.request<T>(url, {data, method: Method.POST})
    }

    put<T>(url: string, data: Object) {
        return this.request<T>(url, {data, method: Method.PUT})
    }

    delete<T>(url: string, data: Object) {
        return this.request<T>(url, {data, method: Method.DELETE})
    }

    request<T>(url: string, options: RequestOptions, timeout = 5000): Promise<T> {
        const {method, data} = options

        return new Promise<T>((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
            xhr.withCredentials = true

            xhr.onload = () => {
                let response = xhr.response

                try {
                    response = JSON.parse(xhr.response)
                } catch (e) {}

                switch (xhr.status) {
                    case 200:
                        resolve(response)
                        break
                    case 401:
                        router.go(Pathname.Authorization)
                        break
                    default:
                        reject(response)
                        break
                }
            }

            xhr.onabort = reject
            xhr.onerror = reject
            xhr.ontimeout = reject

            if (method === Method.GET || !data) {
                xhr.send()
            } else {
                xhr.send(JSON.stringify(data))
            }

            setTimeout(() => xhr.abort(), timeout)
        })
    }
}
