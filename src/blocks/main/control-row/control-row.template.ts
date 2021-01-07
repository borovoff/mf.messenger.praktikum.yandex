export const controlRowTemplate = `
<div class="control-row">
    <app-icon-button
        [buttonClick]="showMenu"
        [outer]="outerMenu"
        [inner]="innerMenu"></app-icon-button>
    <app-context-menu
        [class]="menuClass"
        [items]="items"></app-context-menu>
    <form class="search-form">
        <img class="search-img" src="../assets/search_svg.svg">
        <input class="search-input" placeholder="Search">
    </form>
</div>
`
