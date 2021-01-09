export const emailInputTemplate = `
<label class="label">
    <span class="caption">{{name}}</span>
    <input
        [blur]="blur"
        [focus]="focus"
        [name]="name"
        class="input"
        type="email"
        [value]="inputValue"
        [placeholder]="name">
</label>
`
