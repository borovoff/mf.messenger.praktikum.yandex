export const controlRowTemplate = `
<div class="control-row">
    <app-icon-button
        [outer]="outerMenu"
        [inner]="innerMenu"></app-icon-button>
    <form class="search-form">
        <img class="search-img" src="../assets/search_svg.svg">
        <input class="search-input" placeholder="Search">
    </form>
</div>
`
