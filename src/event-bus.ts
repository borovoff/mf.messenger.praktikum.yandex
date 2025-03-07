type Listeners = {
    [key: string]: Callback[]
}

type Callback = (...args: unknown[]) => void


export class EventBus {
    listeners: Listeners

    constructor() {
        this.listeners = {}
    }

    on(event: string, callback: Callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }

        this.listeners[event].push(callback)
    }

    off(event: string, callback: Callback) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`)
        }

        this.listeners[event] = this.listeners[event]
            .filter(listener => listener !== callback)
    }

    emit(event: string, ...args: unknown[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`)
        }

        this.listeners[event].forEach(listener =>
            listener(...args))
    }
}
