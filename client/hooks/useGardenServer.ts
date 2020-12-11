export default function useGardenServer(props: { token?: string }) {
	let gardenServer =
		process.env.NEXT_PUBLIC_GARDEN_SERVER_URL ||
		'https://garden-server.vercel.app'
	//Create URL with garden server from uri
	// Provide uris with forward slash - `/api/hi/roy` - please
	function createUrl(uri: string) {
		let url = `${gardenServer}${uri}`
		return url
	}

	function createHeaders() {
		if (props.token) {
			return {
				'Content-Type': 'application/json',
				Authorization: props.token,
			}
		}
		return {
			'Content-Type': 'application/json',
		}
	}

	return {
		createUrl,
		createHeaders,
	}
}
