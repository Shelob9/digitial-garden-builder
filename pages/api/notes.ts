import { INote } from './../../components/Note'
import { getSession } from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next'

let notes: INote[] = [
	{
		id: 1,
		content:
			'# Hi Roy \n One **One** [two](/notes/two) \n ## H2 \n Arms \n ## H22 \n a \n [external](https://hiroy.club)',
		title: 'Note One ',
		slug: 'oner',
		references: [
			{
				noteId: 2,
			},
		],
	},
	{
		id: 2,
		slug: 'two',
		content: '# Roots \n Two **One**',
		title: 'Note Two',
	},
]
export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=86400')
	res.status(200).json(notes)
}
