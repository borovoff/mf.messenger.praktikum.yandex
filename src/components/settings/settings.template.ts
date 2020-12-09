export const settingsTemplate = `
<div class="login-column">
    <div class="edit-header">
        <app-button
                [outer]="button.outer"
                [inner]="button.inner"></app-button>
        <h3>Edit profile</h3>
    </div>


    <div class="photo-preview">
        <img class="main-avatar">
        <img
                class="add-photo"
                src="assets/cameraadd_svg.svg">
    </div>

    <form>
        <app-input [name]="firstName"></app-input>
        <app-input [name]="secondName"></app-input>
        <app-input [name]="displayName"></app-input>
        <app-input [name]="login"></app-input>
        <app-input [name]="email"></app-input>
        <app-input [name]="phone"></app-input>

        <input
                class="next"
                value="Change"
                type="submit">
    </form>

</div>
`
