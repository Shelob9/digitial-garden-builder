import { apiRequestUpdateContent } from "./../lib/apiTypes";
/**
 * Hook with logic for interacting with local git API
 *
 * /api/content
 */
export const useLocalGitApi = () => {
	const fetchGitSave = (update: apiRequestUpdateContent) => {
		return fetch("/api/content", {
			method: "POST",
			body: JSON.stringify(update),
		})
			.then((r) => r.json())
			.then((r) => {
				return r;
			})
			.catch((e) => {
				console.log(e);
				throw e;
			});
	};
	return { fetchGitSave };
};
