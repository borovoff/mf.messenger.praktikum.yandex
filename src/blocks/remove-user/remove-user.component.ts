import './remove-user.sass'
import {removeUserTemplate} from './remove-user.template'
import {FormBlock} from '../../components/block/form-block'
import {router} from '../../helpers/router/router-instance'
import {Pathname} from '../../models/enums/pathname'
import {api} from '../../helpers/api/api'

export class RemoveUserComponent extends FormBlock {
    constructor(context: Object = {
        login: 'Login',
        addUser: 'Remove user'
    }) {
        super(context, removeUserTemplate)

        this.setContext({
            submit: this.userSubmit
        })
    }

    userSubmit = (event: Event) => {
        const fn = (addRequest: any) => api.deleteUser(addRequest)
            .then(() => router.go(Pathname.Slash))

        this.findSubmit(event, fn)
    }
}
