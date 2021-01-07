export const chatHeaderTemplate = `
<div class="chat-header">
    <app-chat-image [imgClass]="imgHeader"></app-chat-image>

    <div class="chat-title-column">
        <div class="chat-header-title">Юля</div>
        <div class="chat-online">online</div>
    </div>

    <app-icon-button
        [inner]="search"></app-icon-button>
    <app-icon-button
        [inner]="more"></app-icon-button>

</div>
`
