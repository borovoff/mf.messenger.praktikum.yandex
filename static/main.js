const form = document.getElementsByTagName('form')[0]

form.onsubmit = event => {
    event.preventDefault()
    const formData = new FormData(form)
    console.log(...formData)
}
