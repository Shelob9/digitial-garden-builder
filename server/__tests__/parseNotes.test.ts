import { noteFactory, noteIndexItemFactory } from './testUtil'
import mapNoteLinks from '../lib/mapNoteLinks'

let notes = [
	{ slug: 'one', content: `[[two]]` },
	{ slug: 'two', content: `Listen To More Sepultura` },
].map(({ slug, content }) => {
	return noteFactory(slug, content)
})

let noteIndex = notes.map((n) => noteIndexItemFactory(n.slug))

describe('Parsing notes', () => {
	it('maps note links', () => {
		let map = mapNoteLinks(notes, noteIndex)
		expect(map.nodes.length).toBe(2)
		expect(map.links.length).toBe(1)
	})
})
