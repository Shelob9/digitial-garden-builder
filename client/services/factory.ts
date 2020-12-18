import { gitRepoDetails } from './../../types/git'
import GardenService from './GardenService'

export const gardenServiceFactory = () => {
	const service = new GardenService(
		process.env.NEXT_PUBLIC_GARDEN_SERVER_PUBLIC_KEY,
		process.env.NEXT_PUBLIC_GARDEN_SERVER_URL ??
			'https://digitalgardenbuilder.app'
	)
	return service
}
