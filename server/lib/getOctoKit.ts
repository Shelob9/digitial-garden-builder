import { Octokit } from '@octokit/rest'

export type gitRepoDetails = {
	owner: string
	repo: string
}
export function getOctokit(authToken?: string): Octokit {
	return new Octokit({
		auth: authToken ?? process.env.GITHUB_API_TOKEN,
	})
}
