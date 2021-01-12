export const messageInputTemplate = `
<form class="main-form my last">
    <img class="input-smile" src="../assets/smile_svg.svg">
    <img class="input-attach" src="../assets/attach_svg.svg">
    <div class="tail input-tail"></div>
    <input class="main-input" placeholder="Message" type="text">
</form>

<app-icon-button
    [outer]="outerMicro"
    [inner]="innerMicro"></app-icon-button>
`
