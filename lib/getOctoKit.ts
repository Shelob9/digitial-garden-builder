import { Octokit } from '@octokit/rest'

export type gitRepoDetails = {
	owner: string
	repo: string
}
export function getOctokit(): Octokit {
	return new Octokit({
		auth: `db9469c99f780686801d74281dee053c1d25710a`,
		//auth: process.env.GITHUB_API_TOKEN,
	})
}
