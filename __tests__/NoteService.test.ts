import { INote } from './../components/Note'
import NoteService from '../NoteService'

describe('NoteService', () => {
	let notes: INote[] = [
		{ id: 3, title: '13', content: '1333', slug: 'three' },
		{ id: 1, title: '1', content: '1', slug: 'one' },
		{ id: 7, title: '7', content: '7', slug: 'seven' },

		{ id: 11, title: '11', content: '11', slug: 'el' },
	]
	test('Sets and gets notes', () => {
		let service = new NoteService()
		service.setNotes(notes)
		expect(notes).toEqual(service.getNotes())
	})
	test('Get note by id', () => {
		let service = new NoteService()
		service.setNotes(notes)
		expect(service.getNoteById(7).slug).toEqual('seven')
	})
	test('Get note by slug', () => {
		let service = new NoteService()
		service.setNotes(notes)
		expect(service.getNoteBySlug('one').id).toEqual(1)
	})
})
