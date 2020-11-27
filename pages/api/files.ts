import { getSession } from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next'
import GitApi from '../../lib/GitApi'
import getRepo from '../../lib/getRepo'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req })
	if (!session) {
		return res.status(403).json({ allowed: false })
	}
	let repo = getRepo()
	let git = GitApi(repo, 'master')
	try {
		let files = await git.getFiles(undefined, 'md')
		res.status(202).json({ files })
	} catch (error) {
		console.log(error)
		res.status(500).json({ error })
	}
}
