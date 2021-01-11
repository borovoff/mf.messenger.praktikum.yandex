export const chatHeaderTemplate = `
<div class="chat-header">
    <app-chat-image
        [circleClass]="circleClass"
        [chat]="chat"></app-chat-image>

    <div class="chat-title-column">
        <div class="chat-header-title">{{chatTitle}}</div>
        <div class="chat-online">online</div>
    </div>

    <app-icon-button
        [inner]="search"></app-icon-button>
    <app-icon-button
        [buttonClick]="showMenu"
        [inner]="more"></app-icon-button>

    <app-context-menu
        [class]="menuClass"
        [items]="items"></app-context-menu>

</div>
`
