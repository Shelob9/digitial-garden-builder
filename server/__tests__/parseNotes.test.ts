import { noteFactory, noteIndexItemFactory } from './testUtil'
import mapNoteLinks from '../lib/mapNoteLinks'
import processKeywords from '../lib/processKeywords'
import mapNoteKeywords from '../lib/mapNoteKeywords'
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

	it('Finds some keywords', async () => {
		let keywords = await processKeywords(
			`Terminology mining, term extraction, term recognition, or glossary extraction, is a subtask of information extraction. The goal of terminology extraction is to automatically extract relevant terms from a given corpus.`
		)
		expect(keywords.phrases.length).toBe(15)
		expect(keywords.keywords.length).toBe(8)
	})

	it('maps keywords relationships', async () => {
		let notes = [
			{
				slug: 'one',
				content: `Slayer is a heavy metal band from salad.`,
			},
			{ slug: 'two', content: `I think salad is made out of vegetables` },
			{ slug: 'three', content: `Fear` },
		].map(({ slug, content }) => {
			return noteFactory(slug, content)
		})
		let keywords1 = await processKeywords(
			notes.find((n) => n.slug === 'one').content
		)
		expect(keywords1.keywords.length).toBe(3)
		let keywords2 = await processKeywords(
			notes.find((n) => n.slug === 'two').content
		)
		expect(keywords2.keywords.length).toBe(2)
		const graph = await mapNoteKeywords(
			notes.find((n) => n.slug === 'one'),
			notes
		)
		expect(graph.nodes.length).toBe(2)
		expect(graph.nodes.findIndex((n) => 'one' === n.id)).toBeGreaterThan(-1)
		expect(graph.nodes.findIndex((n) => 'two' === n.id)).toBeGreaterThan(-1)
		expect(graph.nodes.findIndex((n) => 'three' === n.id)).toBe(-1)
		expect(graph.links.length).toBe(1)
		expect(graph.links[0].source).toBe('one')
		expect(graph.links[0].target).toBe('two')
	})
})
