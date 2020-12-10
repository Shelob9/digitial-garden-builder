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
