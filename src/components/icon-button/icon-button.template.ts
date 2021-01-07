export const iconButtonTemplate = `
<button
    [click]="buttonClick"
    [class]="'base-button' + outer">
    <div [class]="'base-button-img' + inner"></div>
</button>
`
