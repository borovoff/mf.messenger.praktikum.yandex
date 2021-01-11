export const chatTemplate = `
<app-chat-image
    [chat]="chat"
    class="disable_events"></app-chat-image>
<div class="chat__text disable_events">
    <div class="chat__top">
        <div class="chat__title">
            {{chatTitle}}
        </div>
        <div class="chat__read">
            12 Oct
        </div>
    </div>
    <div class="chat__bottom">
        <div class="chat__message">
            Второе тоже захвати ))
        </div>
        <div class="chat__counter hide">0</div>
    </div>
</div>
`
