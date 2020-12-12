export const photoPickerTemplate = `
<div class="cancel-area flex-center">
    <div class="photo-picker flex-center">
        <app-icon-button
            [outer]="checkButton.outer"
            [inner]="checkButton.inner"></app-icon-button>
        <app-icon-button
            [outer]="closeButton.outer"
            [inner]="closeButton.inner"></app-icon-button>

        <div class="avatar-rect flex-center">
            <div class="avatar-round"></div>
            <img
                    class="avatar-img"
                    src="assets/photos/cat.jpg">
        </div>

        <h4 class="picker-caption">Drag to reposition</h4>
    </div>
</div>
`
