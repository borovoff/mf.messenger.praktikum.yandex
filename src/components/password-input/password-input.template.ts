export const passwordInputTemplate = `
<label class="label">
    <span class="caption">{{name}}</span>
    <input
            [name]="name"
            class="input"
            type="password"
            [placeholder]="name">
    <button
            class="form-button"
            type="button">
        <img src="assets/eye1_svg.svg">
    </button>
</label>
`
