export interface GardenConfig {
	title: string
	author: string
}

class ConfigApiService {
	client
	config: GardenConfig
	constructor(client) {
		this.client = client
	}

	fetchConfig = async () => {
		return this.client.getFile('/garden.json').then(({ content }) => {
			return JSON.parse(content)
		})
	}

	getGardenTitle = () => {
		return this.config.title
	}
}

export default ConfigApiService
