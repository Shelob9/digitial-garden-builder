import { Octokit } from '@octokit/rest'

export function getOctokit(authToken?: string): Octokit {
	return new Octokit({
		auth: authToken ?? process.env.GITHUB_API_TOKEN,
	})
}
