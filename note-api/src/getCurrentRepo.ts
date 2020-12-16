import { gitRepoDetails } from './types/git';
export default function getCurrentRepo(): gitRepoDetails {
	const owner = process.env.REPO_OWNER ?? 'shelob9';
	const repo = process.env.REPO_NAME ?? 'shelob9';

	return {
		owner,
		repo,
	};
}
