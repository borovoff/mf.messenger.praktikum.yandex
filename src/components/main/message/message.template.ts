export const messageTemplate = `
<li [class]="class">
    <div class="tail"></div>
    <div class="message-text">
        <span class="message-span">{{text}}</span>
        <div class="float-container">
            <div class="message-date">{{time}}</div>
            <img
                [class]="imgClass"
                src="../assets/2checks_svg.svg"></div>
    </div>
</li>
`
