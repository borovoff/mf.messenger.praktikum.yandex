import {WeekDay} from './week-day'
import {Month} from './month'
import {FullWeekDay} from './full-week-day'
import {FullMonth} from './full-month'


const hour = 60 * 60
const day = 24 * hour
const week = 7 * day

export class DateHelper {
    static getTime(timestamp: number): string {
        const date = new Date(1000 * timestamp)
        const now = new Date()
        const nowTimestamp = now.getTime() / 1000

        const delta = nowTimestamp - timestamp

        if (delta > 0) {
            if (delta < day) {
                const hours = date.getHours()
                const minutes = '0' + date.getMinutes()

                return hours + ':' + minutes.substr(-2)
            } else if (delta >= day && delta < week) {
                const weekDay = date.getDay()

                return WeekDay[weekDay]
            } else {
                const d = date.getDate()
                const month = date.getMonth()
                const year = date.getFullYear()

                if (now.getFullYear() === year) {
                    return d + ' ' + Month[month]
                } else {
                    return d + '/' + month + '/' + year
                }
            }
        }

        return ''
    }

    static getTimeMessages(time: string): string {
        const date = new Date(time)
        const timestamp = date.getTime()
        const now = new Date()
        const nowTimestamp = now.getTime()

        const delta = nowTimestamp - timestamp

        if (this.sameDate(nowTimestamp, timestamp)) {
            return 'Today'
        }

        if (delta > 0) {

            if (delta < week) {
                const weekDay = date.getDay()

                return FullWeekDay[weekDay]
            } else {
                const d = date.getDate()
                const month = date.getMonth()
                const year = date.getFullYear()

                if (now.getFullYear() === year) {
                    return d + ' ' + FullMonth[month]
                } else {
                    return d + '/' + month + '/' + year
                }
            }
        }

        return ''
    }

    static getTimeMessage(time: string): string {
        const date = new Date(time)
        const hours = date.getHours()
        const minutes = '0' + date.getMinutes()

        return hours + ':' + minutes.substr(-2)
    }

    static sameDate(first: number, second: number): boolean {
        const f = new Date(first)
        const s = new Date(second)

        return f.getDate() === s.getDate() &&
            f.getMonth() === s.getMonth() &&
            f.getFullYear() === s.getFullYear()
    }
}
