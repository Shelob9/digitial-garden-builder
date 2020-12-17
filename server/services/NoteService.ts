import { noteIndex, noteIndexItem } from '../../types'

/**
 * Collection for note index.
 * Do not use, probably will be deleted.
 */
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
