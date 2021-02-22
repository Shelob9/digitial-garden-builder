import getSession from '../../../lib/getSession'
import { NextApiRequest, NextApiResponse } from 'next'
import createCorsMiddleWare from '../../../lib/createCorsMiddleWare'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const cors = createCorsMiddleWare(['GET', 'OPTIONS'])
	await cors(req, res)
	const session = await getSession(req)
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=17')
	res.status(200).json({ hi: session ? session.name : 'Roy' })

	/**
	 * App authorization
	 *
	 * When someone revokes their authorization of a GitHub App, this event occurs.
	 *
	 * @see https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#github_app_authorization
	 */

	/**
	 * Activity related to a GitHub App installation. The type of activity is specified in the action property of the payload object.
	 *
	 * @see https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#installation
	 */

	/**
	 * Activity related to repositories being added to a GitHub App installation. The type of activity is specified in the action property of the payload object.
	 *
	 * @see https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#installation_repositories
	 */
}
