export const beforeMessagesTemplate = `
<img
    class="before-messages-img"
    src="assets/chatsplaceholder_svg.svg">
<div class="before-messages-caption">
    <div>Open Chat</div>
    <div>or create a new one</div>
</div>
<div class="bm-buttons">
    <app-before-messages-button
        class="bm-button-container"
        [beforeClass]="button.class"
        [beforeCaption]="button.caption"
        *for="button of buttons"></app-before-messages-button>
</div>
`
