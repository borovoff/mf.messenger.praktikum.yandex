export const photoPickerTemplate = `
<div class="popup photo-picker flex-center">
    <app-icon-button
        [buttonClick]="sendPhoto"
        [outer]="checkButton.outer"
        [inner]="checkButton.inner"></app-icon-button>
    <app-icon-button
        [buttonClick]="hidePicker"
        [outer]="closeButton.outer"
        [inner]="closeButton.inner"></app-icon-button>

    <div class="photo-picker__avatar_rect flex-center">
        <div class="avatar_round"></div>
        <img
            class="avatar__img"
            [src]="imgSrc">
    </div>

    <h4 class="photo-picker__caption">Drag to reposition</h4>
</div>
`
