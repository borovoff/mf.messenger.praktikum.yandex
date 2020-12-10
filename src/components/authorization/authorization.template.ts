export const authorizationTemplate = `
<div class="login-column">
    <h1>Authorization</h1>

    <form [submit]="submit">
        <app-input
            [name]="name"></app-input>

        <app-password-input
            [name]="password"></app-password-input>

        <input
                class="next"
                value="Authorization"
                type="submit">
    </form>
</div>
`
