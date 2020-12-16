import { gitRepoDetails } from './../../types/git'
import GardenService from './GardenService'

export const gardenServiceFactory = (
	repo: gitRepoDetails,
	authToken: string
) => {
	const service = new GardenService(
		repo,
		authToken,
		process.env.NEXT_PUBLIC_GARDEN_SERVER_URL ??
			'https://digitalgardenbuilder.app'
	)
	return service
}
