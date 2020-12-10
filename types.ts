export interface INote {
	title: string
	content: string
	slug: string
	references?: NoteReferences
}

export interface NoteReference {
	slug: string
	url: string
}

export type NoteReferences = NoteReference[]
export type noteIndexItem = {
	slug: string
	path: string
	name: string
	apiUrl: string
	url: string
}
export type noteIndex = noteIndexItem[]
