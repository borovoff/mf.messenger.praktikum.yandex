export const mainTemplate = `
<div class="main-component">
    <div class="left-column">
        <app-control-row></app-control-row>

        <ul class="ul chats">
            <app-chat [imgClass]="img.chat"></app-chat>
        </ul>
    </div>
    <div class="right-column">
        <app-chat-header
            [search]="inner.search"
            [more]="inner.more"
            [imgHeader]="img.header"></app-chat-header>

        <div class="messages-component">
            <ul class="ul messages">
                <app-message
                    *for="message of messages"
                    [class]="message.class"
                    [text]="message.text"
                    [time]="message.time"
                    [imgClass]="message.imgClass"></app-message>
            </ul>
        </div>

        <app-message-input
            [innerMicro]="inner.micro"
            [outerMicro]="outer.micro"></app-message-input>
    </div>
</div>
`
