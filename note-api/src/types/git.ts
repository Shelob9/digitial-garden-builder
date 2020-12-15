import { noteIndex } from './../types'
export type gitRepoDetails = {
	owner: string
	repo: string
}

export interface IGitApi {
	saveFile: (
		content: string,
		fullFilePath: string,
		commitMessage: string
	) => Promise<{ commitSha: string }>
	getFile: (filePath: string) => Promise<{ content: string } | undefined>
	getFiles: (path: string | undefined, extension: 'md') => Promise<noteIndex>
}
