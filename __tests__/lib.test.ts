import findNoteSlugInLink from '../lib/findNoteSlugInLink'
import { findWikiLinks } from '../lib/findReferences'

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
