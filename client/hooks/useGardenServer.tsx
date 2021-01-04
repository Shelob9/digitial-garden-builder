

export default function useGardenServer(props:{token?:string}) {
	let gardenServerUrl =
		process.env.NEXT_PUBLIC_GARDEN_SERVER_URL ||
		'https://digitalgardenbuilder.app'
	
	let gardenServerPublicKey =
		process.env.NEXT_PUBLIC_GARDEN_SERVER_PUBLIC_KEY;
	
	let loginLink = `${gardenServerUrl}/login?publicKey=${gardenServerPublicKey}`
	//Create URL with garden server from uri
	// Provide uris with forward slash - `/api/hi/roy` - please
	// The publicKey will be added as a query variables
	function createUrl(uri: string) {
		let url = `${gardenServerUrl}${uri}?publicKey=${gardenServerPublicKey}`
		return url
	}

	//Create request headers with token
	function createHeaders() {
		if (props.token) {
			return {
				'Content-Type': 'application/json',
				Authorization: props.token,
				'x-garden-public': gardenServerPublicKey,
			}
		}
		return {
			'Content-Type': 'application/json',
			'x-garden-public': gardenServerPublicKey,

		}
	}


    
	return {
		createUrl,
		createHeaders,
		gardenServerUrl,
		loginLink,
		gardenServerPublicKey
	}
}
