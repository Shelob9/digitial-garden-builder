import findNoteSlugInLink from '../lib/findNoteSlugInLink'
import findReferences, { findWikiLinks } from '../lib/findReferences'
import { noteIndex } from '@garden-cms/note-api'
describe('find note slug', () => {
	it('Returns if found', () => {
		expect(findNoteSlugInLink('/notes/fish')).toEqual('fish')
	})

	it('Returns nothing if not found', () => {
		expect(findNoteSlugInLink('/posts/turtle')).toBeFalsy()
	})
})

describe('find wiki linlks', () => {
	it('finds one links', () => {
		expect(findWikiLinks(`Hello [[roy]] `)).toEqual(['roy'])
	})
	it('finds two links', () => {
		expect(findWikiLinks(`Hello [[roy]] and merry [[christmas]]`)).toEqual([
			'roy',
			'christmas',
		])
	})

	it('finds no links', () => {
		expect(findWikiLinks(`Hello roy`)).toEqual([])
	})
})

describe('findReferences', () => {
	let notes: noteIndex = [
		{
			slug: 'two',
			url: '/notes/two',
			apiUrl: '',
			path: '',
			name: '',
		},
		{
			slug: 'five',
			url: '/notes/five',
			apiUrl: '',
			path: '',
			name: '',
		},
	]
	test('finds a reference', () => {
		expect(findReferences(`hello [[five]]`, notes)).toEqual([
			{ slug: 'five', url: '/notes/five' },
		])
	})

	test('finds two references', () => {
		expect(findReferences(`hello [[five]] hi [[two]]`, notes)).toEqual([
			{ slug: 'five', url: '/notes/five' },
			{ slug: 'two', url: '/notes/two' },
		])
	})
	test('Ignores links to non-notes', () => {
		expect(findReferences(`hello [[five]] hello [[roy]]`, notes)).toEqual([
			{ slug: 'five', url: '/notes/five' },
		])
	})
})
