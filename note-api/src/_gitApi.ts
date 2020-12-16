import { IGitApi } from './types/git';
import { gitRepoDetails } from './types/git';
import { getOctokit } from './lib/getOctoKit';
import {
	createBlobForFile,
	createNewCommit,
	createNewTree,
	getCurrentCommit,
	setBranchToCommit,
} from './lib/gitUtil';

export const getRepos = async () => {
	return await getOctokit().repos.listForAuthenticatedUser();
};

export default function gitApi(
	gitRepo: gitRepoDetails,
	branch: string,
	authToken?: string
): IGitApi {
	let octo = getOctokit(authToken);
	const saveFile = async (
		content: string,
		fullFilePath: string,
		commitMessage: string
	): Promise<{ commitSha: string }> => {
		const currentCommit = await getCurrentCommit({
			octo,
			...gitRepo,
			branch,
		});

		let blob = await createBlobForFile({
			octo,
			...gitRepo,
			content,
		});

		let newTree = await createNewTree({
			octo,
			...gitRepo,
			blobs: [blob],
			paths: [fullFilePath],
			parentTreeSha: currentCommit.treeSha,
		});
		const newCommit = await createNewCommit({
			octo,
			...gitRepo,
			commitMessage,
			currentTreeSha: newTree.sha,
			currentCommitSha: currentCommit.commitSha,
		});
		//@ts-ignore
		let commit = await setBranchToCommit({
			octo,
			...gitRepo,
			branch,
			commitSha: newCommit.sha,
		});
		return { commitSha: newCommit.sha };
	};

	const getFile = async (
		filePath: string
	): Promise<{ content: string } | undefined> => {
		return await octo.repos
			.getContent({
				...gitRepo,
				path: filePath,
			})
			.catch(e => {
				return e;
			})
			.then(result => {
				if (!result) {
					return;
				}
				// content will be base64 encoded
				const content = Buffer.from(result.data.content, 'base64').toString();
				if (!content) {
					return;
				}
				return { content };
			});
	};

	const getFiles = async (path: string | undefined, extension: 'md') => {
		let r = await octo.repos
			.getContent({
				...gitRepo,
				path: path as string,
			})
			.catch(e => {
				console.log(e);
				throw e;
			})
			.then(({ data }) => {
				return data;
			});

		//@ts-ignore
		return r.filter(
			(f: { name: string; type: string }) =>
				'file' === f.type && f.name.endsWith(`.${extension}`)
		);
	};

	return {
		saveFile,
		getFile,
		getFiles,
	};
}
