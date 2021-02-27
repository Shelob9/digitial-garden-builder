import { IGitApi } from '@digital-garden-builder/git-cms/dist/lib/git/GitApi'
import { GardenConfig } from '../../types/config'

let configPath = '/garden.json'
/**
 * API client for garden settings.
 */
class ConfigApiService {
	client: IGitApi
	config: GardenConfig
	constructor(client: IGitApi) {
		this.client = client
	}

	fetchConfig = async () => {
		return this.client.getFile(configPath).then(({ content }) => {
			this.config = JSON.parse(content)
			return this.config
		})
	}

	saveConfig = async (settings: GardenConfig) => {
		this.config = settings
		return this.client
			.saveFile(
				JSON.stringify(settings),
				'garden.json',
				`Update Settings`
			)
			.then(() => {
				return this.config
			})
			.catch((e) => console.log(e))
	}
	getGardenTitle = () => {
		return this.config.siteName
	}

	getSettings = () => {
		return this.config
	}
}

export default ConfigApiService
