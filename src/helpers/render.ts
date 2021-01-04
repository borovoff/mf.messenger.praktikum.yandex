export function render(query: string, block: HTMLElement) {
    const root = document.querySelector(query) as HTMLElement

    while (root.childElementCount > 0) {
        (root.lastChild as HTMLElement).remove()
    }

    root.appendChild(block)

    return root
}
