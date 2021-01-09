export const inputTemplate = `
<label class="label">
    <span class="caption">{{name}}</span>
    <input
        [blur]="blur"
        [focus]="focus"
        [name]="name"
        class="input"
        type="text"
        [value]="inputValue"
        [placeholder]="name">
</label>
`
