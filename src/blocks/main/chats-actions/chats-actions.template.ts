export const chatsActionsTemplate = `
<app-context-menu
    [class]="menuClass"
    [items]="items"></app-context-menu>
<app-icon-button
    [buttonClick]="showMenu"
    [outer]="outerEdit"
    [inner]="innerEdit"></app-icon-button>
`
