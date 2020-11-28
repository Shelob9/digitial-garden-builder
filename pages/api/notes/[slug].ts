import { getSession } from 'next-auth/client'
import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
import GitApi from '../../../lib/GitApi'
import NotesApiService from '../../../NotesApiService'
export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=86400')
	const { slug } = req.query
	const session = await getSession({ req })
	if (!session) {
		return res.status(403).json({ allowed: false })
	}
	let client = GitApi(
		{ owner: 'shelob9', repo: 'garden-cms-test-data' },
		'main',
		session.authToken
	)
	let noteService = new NotesApiService(client)
	await noteService.fetchNoteIndex()
	let note = await noteService.fetchNote(slug as string)
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=3600')
	res.status(200).json({ note })
}
