import {Templator} from './templator'
import { expect } from 'chai'

describe('Templator test', () => {
    it('templator should can parse and append', () => {
        const jsdom = require('jsdom')
        const { JSDOM } = jsdom
        const { document } = (new JSDOM(`...`)).window
        new Templator('<div>{{name}}</div>', document, {name: 'john'})
        expect(document.firstChild.textContent, 'john')
    })
})
