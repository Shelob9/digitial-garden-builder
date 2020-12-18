import { Garden, gardens } from '../../types'

let josh = {
	github: {
		login: 'Shelob9',
		id: 1994311,
	},
}
let theGardens: gardens = [
	{
		rootUrl: `https://docs.digitalgardenbuilder.app/`,
		afterLoginUrl: `https://docs.digitalgardenbuilder.app//login/after`,
		repo: {
			owner: 'shelob9',
			repo: 'garden-cms-test-data',
		},
		gardenServerUrl: `https://digitalgardenbuilder.app/`,
		publicKey: '3erty54ear',
		gardener: josh,
	},
	{
		rootUrl: `http://localhost:3202`,
		afterLoginUrl: `http://localhost:3202/login/after`,
		repo: {
			owner: 'shelob9',
			repo: 'garden-cms-test-data',
		},
		gardenServerUrl: `http://localhost:3000`,
		publicKey: '3erty54ear',
		gardener: josh,
	},
]
/**
 * Gets digital gardens allowed by this server
 */
export default class GardenerService {
	getGarden = async (publicKey: string): Promise<Garden> => {
		return new Promise(async (resolve, reject) => {
			const garden = theGardens.find((g) => g.publicKey === publicKey)
			if (garden) {
				resolve(garden)
			}
			reject()
		})
	}
}
