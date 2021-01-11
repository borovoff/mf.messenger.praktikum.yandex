export const removeUserTemplate = `
<div class="login-column">
    <div class="edit-header">
        <app-icon-button
            [buttonClick]="backClick"
            [inner]="buttonInner"></app-icon-button>
        <h3>Remove user</h3>
    </div>

    <form [submit]="submit">
        <app-input [name]="login"></app-input>

        <app-button [value]="addUser"></app-button>
    </form>
</div>
`
