import { Garden, gardens } from '../../types'
let theGardens: gardens = [
	{
		rootUrl: `http://localhost:3202`,
		afterLoginUrl: `http://localhost:3202/login/after`,
		repo: {
			owner: 'shelob9',
			repo: 'garden-cms-test-data',
		},
		gardenServerUrl: `http://localhost:3000`,
		publicKey: '3erty54ear',
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
