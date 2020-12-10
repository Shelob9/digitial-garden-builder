import { noteIndex, noteIndexItem } from '../../types'

class NoteService {
	notes: noteIndex

	constructor() {
		this.notes = []
	}

	setNotes = (notes: noteIndex) => {
		this.notes = notes
	}
	getNotes = (): noteIndex => {
		return this.notes
	}

	getNoteBySlug = (slug: string): noteIndexItem | undefined => {
		return this.notes.find((note) => slug === note.slug)
	}
}

export default NoteService
