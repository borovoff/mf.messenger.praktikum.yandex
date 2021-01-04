export const authorizationTemplate = `
<div class="login-column">
    <h1>Authorization</h1>

    <form [submit]="submit">
        <app-input
            [name]="name"></app-input>

        <app-password-input
            [name]="password"></app-password-input>

        <app-button [value]="buttonValue"></app-button>
    </form>

    <app-button
        [click]="registrationClick"
        [value]="registration"></app-button>
</div>
`
