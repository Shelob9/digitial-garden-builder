import { getOctokit, gitRepoDetails } from './getOctoKit'
import {
	createBlobForFile,
	createNewCommit,
	createNewTree,
	getCurrentCommit,
	setBranchToCommit,
} from './gitUtil'

export const getRepos = async () => {
	return await getOctokit().repos.listForAuthenticatedUser()
}

function GitApi(gitRepo: gitRepoDetails, branch: string) {
	let octo = getOctokit()
	const saveFile = async (
		content: string,
		fullFilePath: string,
		commitMessage: string
	): Promise<{ commitSha: string }> => {
		const currentCommit = await getCurrentCommit({
			octo,
			...gitRepo,
			branch,
		})
		let blob = await createBlobForFile({
			octo,
			...gitRepo,
			content,
		})
		let newTree = await createNewTree({
			octo,
			...gitRepo,
			blobs: [blob],
			paths: [fullFilePath],
			parentTreeSha: currentCommit.treeSha,
		})
		const newCommit = await createNewCommit({
			octo,
			...gitRepo,
			commitMessage,
			currentTreeSha: newTree.sha,
			currentCommitSha: currentCommit.commitSha,
		})
		let commit = await setBranchToCommit({
			octo,
			...gitRepo,
			branch,
			commitSha: newCommit.sha,
		})
		return { commitSha: newCommit.sha }
	}

	const getFile = async (filePath: string): Promise<{ content }> => {
		return await octo.repos
			.getContent({
				...gitRepo,
				path: filePath,
			})
			.catch((e) => {
				return e
			})
			.then((result) => {
				if (!result) {
					return
				}
				// content will be base64 encoded
				const content = Buffer.from(
					result.data.content,
					'base64'
				).toString()
				if (!content) {
					return null
				}
				return { content }
			})
	}

	const getFiles = async (path: string | undefined, extension: 'md') => {
		let r = await octo.repos
			.getContent({
				...gitRepo,
				path,
			})
			.catch((e) => {
				console.log(e)
				throw e
			})
			.then(({ data }) => {
				return data
			})

		//@ts-ignore
		return r.filter(
			(f: { name: string; type: string }) =>
				'file' === f.type && f.name.endsWith(`.${extension}`)
		)
	}

	return {
		saveFile,
		getFile,
		getFiles,
	}
}

export default GitApi
