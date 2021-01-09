export const settingsTemplate = `
<div class="login-column">
    <div class="edit-header">
        <app-icon-button
            [buttonClick]="backClick"
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
        <app-input
            [inputValue]="firstNameValue"
            [name]="firstNameName"></app-input>
        <app-input
            [inputValue]="secondNameValue"
            [name]="secondNameName"></app-input>
        <app-input
            [inputValue]="displayNameValue"
            [name]="displayNameName"></app-input>
        <app-input
            [inputValue]="loginValue"
            [name]="loginName"></app-input>
        <app-email-input
            [inputValue]="emailValue"
            [name]="emailName"></app-email-input>
        <app-input
            [inputValue]="phoneValue"
            [name]="phoneName"></app-input>

        <app-button [value]="buttonValue"></app-button>
    </form>

</div>
`
