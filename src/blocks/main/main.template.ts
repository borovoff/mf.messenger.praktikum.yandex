export const mainTemplate = `
<div class="main-component">
    <div class="left-column">
        <div class="control-row">
            <app-icon-button
                [outer]="outer.menu"
                [inner]="inner.menu"></app-icon-button>
            <form class="search-form">
                <img class="search-img" src="../assets/search_svg.svg">
                <input class="search-input" placeholder="Search">
            </form>
        </div>
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
            <ul
                class="ul messages">

                <app-message
                    [class]="message.class"
                    [text]="message.text"
                    [time]="message.time"
                    [imgClass]="message.imgClass"></app-message>


                <li class="message my first">
                    <div class="tail"></div>
                    <div class="message-text"><span class="message-span">Доброе утро 🌞</span>
                        <div class="float-container">
                            <div class="message-date">10:40</div>
                            <img class="check-img" src="../assets/2checks_svg.svg"></div>
                    </div>
                </li>
                <li class="message my">
                    <div class="tail"></div>
                    <div class="message-text"><span class="message-span">😂</span>
                        <div class="float-container">
                            <div class="message-date">11:04</div>
                            <img class="check-img" src="../assets/2checks_svg.svg"></div>
                    </div>
                </li>
                <li class="message my last">
                    <div class="tail"></div>
                    <div class="message-text"><span class="message-span">https://vm.tiktok.com/ZSb1AL1F/</span>
                        <div class="float-container">
                            <div class="message-date">11:04</div>
                            <img src="../assets/2checks_svg.svg" class="check-img"></div>
                    </div>
                </li>
                <li class="message stranger first">
                    <div class="tail"></div>
                    <div class="message-text"><span class="message-span">Что-то пошло не так</span>
                        <div class="float-container">
                            <div class="message-date">11:47</div>
                        </div>
                    </div>
                </li>
                <li class="message stranger">
                    <div class="tail"></div>
                    <div class="message-text"><span class="message-span">[Photo]</span>
                        <div class="float-container">
                            <div class="message-date">13:38</div>
                        </div>
                    </div>
                </li>
                <li class="message stranger last">
                    <div class="tail"></div>
                    <div class="message-text"><span class="message-span">[Photo]</span>
                        <div class="float-container">
                            <div class="message-date">13:39</div>
                        </div>
                    </div>
                </li>
                <li class="message my last first">
                    <div class="tail"></div>
                    <div class="message-text"><span class="message-span">Это на ужин заберешь? )))</span>
                        <div class="float-container">
                            <div class="message-date">13:58</div>
                            <img class="check-img" src="../assets/2checks_svg.svg"></div>
                    </div>
                </li>
                <li class="message stranger last first">
                    <div class="tail"></div>
                    <div class="message-text"><span class="message-span">Нет, тебе привезу, на борщ)</span>
                        <div class="float-container">
                            <div class="message-date">13:59</div>
                        </div>
                    </div>
                </li>
                <li class="message my last first">
                    <div class="tail"></div>
                    <div class="message-text"><span class="message-span">Второе тоже захвати ))</span>
                        <div class="float-container">
                            <div class="message-date">14:07</div>
                            <img class="check-img" src="../assets/2checks_svg.svg"></div>
                    </div>
                </li>


            </ul>
        </div>

        <div class="input-component">
            <form class="main-form my last">
                <img class="input-smile" src="../assets/smile_svg.svg">
                <img class="input-attach" src="../assets/attach_svg.svg">
                <div class="tail input-tail"></div>
                <input class="main-input" placeholder="Message" type="text">
            </form>

            <app-icon-button
                [outer]="outer.micro"
                [inner]="inner.micro"></app-icon-button>
        </div>
    </div>
</div>
`
