export const changePasswordTemplate = `
<div class="login-column">
    <div class="edit-header">
        <app-icon-button
                [outer]="button.outer"
                [inner]="button.inner"></app-icon-button>
        <h3>Change password</h3>
    </div>

    <form [submit]="submit">
        <app-password-input [name]="oldPassword"></app-password-input>
        <app-password-input [name]="newPassword"></app-password-input>
        <app-password-input [name]="repeatPassword"></app-password-input>

        <app-button [value]="buttonValue"></app-button>
    </form>
</div>
`
