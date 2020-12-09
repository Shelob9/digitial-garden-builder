import { IGitApi } from './lib/GitApi'
export interface GardenConfig {
	siteName: string
	siteTwitter?: string
	authorName?: string
	authorTwitter?: string
	defaultNote?: string
}

let configPath = '/garden.json'
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
