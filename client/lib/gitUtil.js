import { Octokit } from '@octokit/rest'

//Git util functions.
//Based on https://dev.to/lucis/how-to-push-files-programatically-to-a-repository-using-octokit-with-typescript-1nj0

/**
 * Get the last commit in repo
 */
export const getCurrentCommit = async (args) => {
	let { octo, owner, repo, branch } = args
	if (!branch) {
		branch = 'master'
	}
	const { data: refData } = await octo.git.getRef({
		owner,
		repo,
		ref: `heads/${branch}`,
	})
	const commitSha = refData.object.sha
	const { data: commitData } = await octo.git.getCommit({
		owner,
		repo,
		commit_sha: commitSha,
	})
	return {
		commitSha,
		treeSha: commitData.tree.sha,
	}
}

//Create a blob from a string, to commit as a file.
export const createBlobForFile = async (args) => {
	let { octo, owner, repo, content } = args
	const blobData = await octo.git.createBlob({
		owner,
		repo,
		content,
		encoding: 'utf-8',
	})
	return blobData.data
}

export const createNewTree = async (args) => {
	let { blobs, octo, owner, repo, paths, parentTreeSha } = args
	// My custom config. Could be taken as parameters
	const tree = blobs.map(({ sha }, index) => ({
		path: paths[index],
		mode: `100644`,
		type: `blob`,
		sha,
	}))
	const { data } = await octo.git.createTree({
		owner,
		repo,
		tree,
		base_tree: parentTreeSha,
	})
	return data
}

export const createNewCommit = async (args) => {
	let {
		octo,
		owner,
		repo,
		commitMessage,
		currentCommitSha,
		currentTreeSha,
	} = args
	const { data } = await octo.git.createCommit({
		owner,
		repo,
		message: commitMessage,
		tree: currentTreeSha,
		parents: [currentCommitSha],
	})
	return data
}

export const setBranchToCommit = async (args) => {
	let { octo, owner, repo, branch, commitSha } = args
	await octo.git.updateRef({
		owner,
		repo,
		ref: `heads/${branch}`,
		sha: commitSha,
	})
}
