export const registrationTemplate = `
<div class="login-column">
    <h1>Registration</h1>

    <form [submit]="submit">
        <app-input [name]="firstName"></app-input>
        <app-input [name]="secondName"></app-input>
        <app-input [name]="login"></app-input>
        <app-email-input [name]="email"></app-email-input>
        <app-password-input [name]="password"></app-password-input>
        <app-input [name]="phone"></app-input>

        <app-button [value]="buttonValue"></app-button>
    </form>
</div>
`
