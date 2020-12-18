import { gitRepoDetails } from './types/git'

/**
 * One note in the garden
 */
export interface INote {
	title: string
	content: string
	slug: string
	references?: NoteReferences
}
/**
 * One note reference
 */
export interface NoteReference {
	slug: string
	url: string
}
/**
 * A collection of note references
 */
export type NoteReferences = NoteReference[]

/**
 * One note in the index of notes
 */
export type noteIndexItem = {
	slug: string
	path: string
	name: string
	apiUrl: string
	url: string
}
/**
 * The note index collection.
 */
export type noteIndex = noteIndexItem[]

/**
 * One digital garden
 */
export interface Garden {
	rootUrl: string
	afterLoginUrl: string
	repo: gitRepoDetails
	gardenServerUrl: string
	publicKey: string
	gardener: Gardener
}
/**
 * One digital gardener
 */
export interface Gardener {
	github: {
		login: string
		id: number
	}
}

/**
 * A collection of digital gardens
 */
export type gardens = Garden[]
