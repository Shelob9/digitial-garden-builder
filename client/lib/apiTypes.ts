import { gitRepoDetails } from '../../types/git'

export type apiContentGetContent = {
	repo: gitRepoDetails
	filePath: string
}

export type apiRequestUpdateContent = {
	repo: gitRepoDetails
	filePath: string
	content: string
}
