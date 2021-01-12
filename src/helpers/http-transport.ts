import {router} from './router-instance'
import {Pathname} from '../models/enums/pathname'
import {showError} from './show-error'
import {queryStringify} from './query-stringify'

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

            if (!(data instanceof FormData)) {
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
            }

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
                        showError({
                            errorJson: JSON.stringify(response, undefined, 4),
                            outerClass: 'cancel-area flex-center'
                        })
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
                if (data instanceof FormData) {
                    xhr.send(data)
                } else {
                    xhr.send(JSON.stringify(data))
                }
            }

            setTimeout(() => xhr.abort(), timeout)
        })
    }
}
