import { Octokit } from "@octokit/rest";

export type gitRepoDetails = {
	owner: string;
	repo: string;
};
export function getOctokit(): Octokit {
	return new Octokit({
		auth: process.env.GITHUB_API_TOKEN,
	});
}
