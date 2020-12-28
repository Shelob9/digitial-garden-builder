import { INote, noteIndex } from './../../types'
import { gitRepoDetails } from '../../types/git'
export default class GardenService {
	publicKey: string
	gardenServerUrl: string
	constructor(publicKey: string, gardenServerUrl: string) {
		this.publicKey = publicKey
		this.gardenServerUrl = gardenServerUrl
	}
	createUrl = (uri: string) => `${this.gardenServerUrl}${uri}`
	createHeaders = () => {
		return {
			'content-type': 'application/json',
			'x-garden-public': this.publicKey,
		}
	}

	fetchNoteIndex = async () => {
		return fetch(this.createUrl(`/api/notes`), {
			method: 'GET',
			headers: this.createHeaders(),
		})
			.then((r) => r.json())
			.then((r) => {
				return r.noteIndex
			})
	}

	fetchNote = async (slug: string): Promise<INote> => {
		return fetch(this.createUrl(`/api/notes/${slug}`), {
			method: 'GET',
			headers: this.createHeaders(),
		})
			.then((r) => r.json())
			.then((r) => {
				return r.note
			})
	}
}
