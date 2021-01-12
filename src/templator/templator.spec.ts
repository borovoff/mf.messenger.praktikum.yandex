import { expect } from 'chai';
import {Templator} from './templator'

describe('Templator test', () => {
    it('templator have to have template property', () => {
        const jsdom = require('jsdom')
        const { JSDOM } = jsdom
        const { document } = (new JSDOM(`...`)).window
        // @ts-ignore
        expect(new Templator('', document, {name: 'name'})).to.have.a.property('template');
    })
})
