import { GardenConfig } from './../types/config';
import { IGitApi } from './../types/git';
let configPath = '/garden.json';
class ConfigApiService {
	client: IGitApi;
	config: GardenConfig | undefined;
	constructor(client: IGitApi) {
		this.client = client;
		this.config = undefined;
	}

	fetchConfig = async () => {
		//@ts-ignore
		return this.client.getFile(configPath).then(({ content }) => {
			this.config = JSON.parse(content);
			return this.config;
		});
	};

	saveConfig = async (settings: GardenConfig) => {
		this.config = settings;
		return this.client
			.saveFile(JSON.stringify(settings), 'garden.json', `Update Settings`)
			.then(() => {
				return this.config;
			})
			.catch(e => console.log(e));
	};
	getGardenTitle = () => {
		if (!this.config) {
			return 'Digital Garden';
		}
		return this.config.siteName;
	};

	getSettings = () => {
		return this.config;
	};
}

export default ConfigApiService;
