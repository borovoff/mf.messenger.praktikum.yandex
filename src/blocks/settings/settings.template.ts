export const settingsTemplate = `
<div class="login-column">
    <div class="edit-header">
        <app-icon-button
                [outer]="button.outer"
                [inner]="button.inner"></app-icon-button>
        <h3>Edit profile</h3>
    </div>


    <div class="photo-preview">
        <img class="main-avatar">
        <img
                class="add-photo"
                src="assets/cameraadd_svg.svg">
    </div>

    <form [submit]="submit">
        <app-input [name]="firstName"></app-input>
        <app-input [name]="secondName"></app-input>
        <app-input [name]="displayName"></app-input>
        <app-input [name]="login"></app-input>
        <app-email-input [name]="email"></app-email-input>
        <app-input [name]="phone"></app-input>

        <app-button [value]="buttonValue"></app-button>
    </form>

</div>
`
