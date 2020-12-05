export const authorization = `
<div class="login-column">
    <h1>Authorization</h1>

    <form>
        <app-input [name]="Login"></app-input>

        <label class="label">
            <div class="caption">Password</div>
            <input
                    name="password"
                    class="input"
                    type="password"
                    placeholder="Password">
            <button
                    class="form-button"
                    type="button">
                <img src="assets/eye1_svg.svg">
            </button>
        </label>

        <input
                class="next"
                value="Authorization"
                type="submit">
    </form>

</div>
`
