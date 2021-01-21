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
                [chat]="chat"
                [chatTitle]="chat.title"></app-chat>

            <app-chats-actions class="chats__actions"></app-chats-actions>
        </ul>
    </div>
    <div class="right-column">
        <app-before-messages [class]="beforeClass"></app-before-messages>

        <app-chat-header
            [class]="headerClass"
            [chat]="currentChat"
            [chatTitle]="chatTitle"></app-chat-header>

        <div
            id="messages"
            [class]="messagesClass">
            <ul class="ul messages">
                <app-message
                    *for="message of messages"
                    [class]="message.class"
                    [text]="message.content"
                    [time]="message.timeFormatted"
                    [imgClass]="message.imgClass"></app-message>
            </ul>
        </div>

        <app-message-input [class]="inputClass"></app-message-input>
    </div>
</div>
`
