import { Garden, gardens } from '../../types'

let josh = {
	github: {
		login: 'Shelob9',
		id: 1994311,
	},
}

/**
 * All gardens.
 *
 * This is a shortcut.
 */
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
		repo: {
			owner: 'shelob9',
			repo: 'garden-cms-test-data',
		},
		gardenServerUrl: `http://localhost:3000`,
		publicKey: '3erty54ear',
		gardener: josh,
	},
	{
		rootUrl: `https://shelob9.github.io/garden-builder-content-template/`,
		repo: {
			owner: 'shelob9',
			repo: 'garden-builder-content-template',
		},
		gardenServerUrl: `https://digitalgardenbuilder.app/`,
		publicKey: '346ed52b9fa674fa85630987bc97a8b27f49',
		gardener: josh,
	},
	{
		rootUrl: `https://garden.joshpress.net`,
		repo: {
			owner: 'shelob9',
			repo: 'josh-garden',
		},
		gardenServerUrl: `https://digitalgardenbuilder.app/`,
		publicKey: 'Y6JyMiwHXqySeDGI2ZA3ZLxUWeKI0XV0YbkWaWwe',
		gardener: josh,
	},
	{
		rootUrl: `https://code.joshpress.net`,
		repo: {
			owner: 'shelob9',
			repo: 'josh-code-garden',
		},
		gardenServerUrl: `https://digitalgardenbuilder.app`,
		publicKey: 'm3kEvEYCm7uI4SaWfI1Z9iWTiiSYu4LvGJ32mgrU3BF6p',
		gardener: josh,
	},
].map((g) => {
	return {
		...g,
		afterLoginUrl: `${g.rootUrl}/login/after`,
	}
})
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
			reject(`Garden not found for pk: ${publicKey}`)
		})
	}
}
