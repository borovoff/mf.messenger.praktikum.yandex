export const createChatTemplate = `
<div class="login-column">
    <div class="edit-header">
        <app-icon-button
            [buttonClick]="backClick"
            [inner]="button.inner"></app-icon-button>
        <h3>Create chat</h3>
    </div>

    <form [submit]="submit">
        <app-input
            [name]="name"></app-input>

        <app-button [value]="buttonValue"></app-button>
    </form>
</div>
`
