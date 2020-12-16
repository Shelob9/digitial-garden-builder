import findNoteSlugInLink from '../lib/findNoteSlugInLink'
describe('find note slug', () => {
	it('Returns if found', () => {
		expect(findNoteSlugInLink('/notes/fish')).toEqual('fish')
	})

	it('Returns nothing if not found', () => {
		expect(findNoteSlugInLink('/posts/turtle')).toBeFalsy()
	})
})
