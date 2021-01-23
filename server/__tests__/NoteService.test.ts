import { noteIndexItem } from './../../types'
import { noteIndex } from '../../types'
import NoteService from '../services/NoteService'
import { noteIndexItemFactory } from './testUtil'

describe('NoteService', () => {
	let notes: noteIndex = [
		noteIndexItemFactory('eleven'),
		noteIndexItemFactory('three'),
		noteIndexItemFactory('seven'),
	]
	test('Sets and gets notes', () => {
		let service = new NoteService()
		service.setNotes(notes)
		expect(notes).toEqual(service.getNotes())
	})

	test('Get note by slug', () => {
		let service = new NoteService()
		service.setNotes(notes)
		expect(service.getNoteBySlug('three').slug).toEqual('three')
	})
})
