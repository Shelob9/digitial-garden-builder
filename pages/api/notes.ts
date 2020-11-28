import { getSession } from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next'

let notes = [
	{
		id: 1,
		content:
			'# Hi Roy \n One **One** [two](/two) \n ## H2 \n Arms \n ## H22 \n a',
		title: 'Note One ',
	},
	{
		id: 2,
		content: '# Roots \n Two **One**',
		title: 'Note Two',
	},
]
export default async (req: NextApiRequest, res: NextApiResponse) => {
	return res.status(200).json(notes)
}
