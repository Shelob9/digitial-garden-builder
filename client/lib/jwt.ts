import jwt from 'jsonwebtoken'
let secret = process.env.JWT_SECRET_KEY || 'jsonSecretJestNeedsEnvVariables'

export const createJwtToken = (data: any) => {
	return jwt.sign(
		{
			exp: Math.floor(Date.now() / 1000) + 60 * 60,
			data,
		},
		secret
	)
}

export const decodeJwtToken = (token: string) => {
	try {
		let decoded = jwt.verify(token, secret)
		//@ts-ignore
		return decoded.data
	} catch (err) {
		return false
	}
}
