export const iconButtonTemplate = `
<button
    [type]="buttonType"
    [click]="buttonClick"
    [class]="'base-button' + outer">
    <div [class]="'base-button-img' + inner"></div>
</button>
`
