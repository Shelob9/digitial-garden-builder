import { INote, noteIndex } from './../../types'
import { gitRepoDetails } from '../../types/git'
export default class GardenService {
	repo: gitRepoDetails
	authToken: string
	gardenServerUrl: string
	constructor(
		repo: gitRepoDetails,
		authToken: string,
		gardenServerUrl: string
	) {
		this.repo = repo
		this.authToken = authToken
		this.gardenServerUrl = gardenServerUrl
	}

	createUrl = (uri: string) => `${this.gardenServerUrl}${uri}`
	createHeaders = () => {
		return {
			'content-type': 'application/json',
			token: this.authToken,
		}
	}

	fetchNoteIndex = async () => {
		return fetch(this.createUrl(`/api/notes`), {
			method: 'GET',
			headers: this.createHeaders(),
		})
			.then(r => r.json())
			.then(r => {
				return r.noteIndex
			})
	}

	fetchNote = async (slug: string): Promise<INote> => {
		return fetch(this.createUrl(`/api/notes/${slug}`), {
			method: 'GET',
			headers: this.createHeaders(),
		})
			.then(r => r.json())
			.then(r => {
				return r.note
			})
	}
}
