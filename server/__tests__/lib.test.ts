import { noteIndex } from '../services/NotesApiService'
import findNoteSlugInLink from '../lib/findNoteSlugInLink'
import findReferences, { findWikiLinks } from '../lib/findReferences'
import { encrypt, decrypt } from '../lib/encryptDecrypt'
import { decodeJwtToken, createJwtToken } from '../lib/jwt'
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

describe('encrypt, decrypt', () => {
	it('encrypts', () => {
		let hash = encrypt('Hi Roy')
		expect(hash.hasOwnProperty('iv')).toBeTruthy()
		expect(hash.hasOwnProperty('content')).toBeTruthy()
	})

	it('decrypts', () => {
		expect(decrypt(encrypt('Hi Roy'))).toEqual('Hi Roy')
	})

	it('Requires valid iv', () => {
		let hash = encrypt('Hi Roy')
		hash.iv = '1234567890123456789012'
		expect(decrypt(hash)).toBeFalsy()
	})
})

describe('jwt', () => {
	let data = { hi: 'Roy' }

	it('Makes tokens', () => {
		expect(typeof createJwtToken(data)).toBe('string')
	})

	it('Decodes tokens', () => {
		expect(decodeJwtToken(createJwtToken(data))).toEqual(data)
	})

	it('Returns false for invalid token', () => {
		expect(
			decodeJwtToken('space turtles down to invisible turtles')
		).toEqual(false)
	})
})
