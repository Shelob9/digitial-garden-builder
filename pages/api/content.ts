import { apiRequestUpdateContent } from './../../lib/apiTypes'
import { getSession } from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next'
import GitApi from '../../lib/GitApi'
import getRepo from '../../lib/getRepo'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req })
	let { content, filePath, repo }: apiRequestUpdateContent =
		'GET' == req.method ? req.query : JSON.parse(req.body)
	repo = repo ? repo : getRepo()
	let git = GitApi(repo, 'master')
	if ('GET' === req.method) {
		try {
			let content = await git.getFile(`${req.query.filePath}.md`)
			res.json({ content })
			res.setHeader('Content-Type', 'application/json')
			res.setHeader('Cache-Control', 's-maxage=17')
			return res
		} catch (error) {
			console.log(error)
			return res.status(500).json({ error })
		}
	} else if (['PUT', 'POST'].includes(req.method)) {
		try {
			let r = await git.saveFile(content, filePath, `Save ${filePath}`)
			res.json({ r })

			return res
		} catch (error) {
			console.log(error)
			return res.status(201).json({ error })
		}
	} else if ('DELETE' === req.method) {
	} else {
		throw new Error()
	}
	res.status(200).json({ hi: session ? session.user.name : 'Roy' })
}
