import {Block} from '../components/block/block'

export function render(query: string, block: Block) {
    const root = document.querySelector(query) as HTMLElement

    while (root.childElementCount > 0) {
        (root.lastChild as HTMLElement).remove()
    }

    root.appendChild(block)
    block.addToDom()

    return root
}
