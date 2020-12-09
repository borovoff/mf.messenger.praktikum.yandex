export const registrationTemplate = `
<div class="login-column">
    <h1>Registration</h1>

    <form>
        <app-input [name]="firstName"></app-input>
        <app-input [name]="secondName"></app-input>
        <app-input [name]="login"></app-input>
        <app-input [name]="email"></app-input>
        <app-password-input [name]="password"></app-password-input>
        <app-input [name]="phone"></app-input>

        <input
                class="next"
                value="Authorization"
                type="submit">
    </form>
</div>
`
