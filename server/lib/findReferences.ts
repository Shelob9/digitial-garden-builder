import { noteIndexItem } from './../../types'
import { noteIndex } from '../../types'
export const findWikiLinks = (content: string): string[] => {
	let matches = content.match(/\[\[(.*?)]]/g)
	if (matches && matches.length) {
		return matches.map((match) => match.replace('[[', '').replace(']]', ''))
	}
	return []
}

export interface NoteReference {
	slug: string
	url: string
}

export type NoteReferences = NoteReference[]

const findReferences = (content, notesIndex: noteIndex): NoteReferences => {
	let links = findWikiLinks(content)
	let references: NoteReferences = []

	if (links.length) {
		links.forEach((link) => {
			let note = notesIndex.find(({ slug }) => link == slug)
			if (note) {
				references.push({
					slug: note.slug,
					url: note.url,
				})
			}
		})
	}
	return references
}

export default findReferences
