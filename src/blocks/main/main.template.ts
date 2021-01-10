export const mainTemplate = `
<div class="main-component">
    <div class="left-column">
        <app-control-row></app-control-row>

        <ul
            [click]="chatClick"
            class="ul chats">
            <app-chat
                *for="chat of chats"
                class="chat"
                [chatTitle]="chat.title"></app-chat>

            <app-chats-actions class="chats__actions"></app-chats-actions>
        </ul>
    </div>
    <div class="right-column">
        <app-chat-header [chatTitle]="chatTitle"></app-chat-header>

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

        <app-message-input></app-message-input>
    </div>
</div>
`
