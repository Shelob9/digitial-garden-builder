import { NodeGraphData } from './../../types/graphs'
import { INote, NoteReference, noteIndex } from './../../types'
import findReferences from './findReferences'

/**
 * Map all links between maps
 */
export default function mapNoteLinks(
	notes: INote[],
	index: noteIndex
): NodeGraphData {
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
