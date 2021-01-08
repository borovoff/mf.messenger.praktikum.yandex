export const contextMenuTemplate = `
<app-context-menu-item
    *for="item of items"
    [imgClass]="item.class"
    [text]="item.text"
    class="context-menu__item"></app-context-menu-item>
`
