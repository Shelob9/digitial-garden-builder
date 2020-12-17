

export default function useGardenServer(props:{token?:string}) {
	let gardenServerUrl =
		process.env.NEXT_PUBLIC_GARDEN_SERVER_URL ||
		'https://digitalgardenbuilder.app'
	
	//Create URL with garden server from uri
	// Provide uris with forward slash - `/api/hi/roy` - please
	function createUrl(uri: string) {
		let url = `${gardenServerUrl}${uri}`
		return url
	}

	//Create request headers with token
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
		gardenServerUrl
	}
}
