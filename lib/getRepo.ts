import { gitRepoDetails } from './getOctoKit'

/**
 * Get the repo to edit/view.
 *
 * @todo make this extensible.
 */
const getRepo = (): gitRepoDetails => {
	return { owner: 'shelob9', repo: 'meadow-foam' }
}
export default getRepo
