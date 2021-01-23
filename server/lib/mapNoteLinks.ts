import { INote, NoteReference, noteIndex } from './../../types'
import findReferences from './findReferences'

export default function mapNoteLinks(notes: INote[], index: noteIndex) {
	let nodes = []
	let links = []
	notes.forEach((note) => {
		nodes.push({
			id: note.slug,
			label: note.title,
		})
		if (!note.hasOwnProperty('references')) {
			note.references = findReferences(note.content, index)
		}
		if (note.references) {
			note.references.forEach((noteLink: NoteReference) => {
				links.push({
					source: note.slug,
					target: noteLink.slug,
				})
			})
		}
	})
	return { nodes, links }
}
