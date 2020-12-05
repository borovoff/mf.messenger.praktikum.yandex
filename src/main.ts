import {Templator} from "./templator/templator"
import {input} from "./components/input/input"

const templator = new Templator(input, document.body, {name: 'lol'})
templator.newReplace()

console.log(templator.toHtml())
