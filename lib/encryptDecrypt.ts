/**
 * Encrypt and decrypt a string
 *
 * @see https://attacomsian.com/blog/nodejs-encrypt-decrypt-data
 */
import * as crypto from 'crypto'

const algorithm = 'aes-256-ctr'
const secretKey = process.env.ENCRYPT_KEY || 'secretmustbe33longJestNeedEnvVar'
const iv = crypto.randomBytes(16)
export type hash = {
	iv: string
	content: string
}
export const encrypt = (text: string): hash => {
	const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
	const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
	return {
		iv: iv.toString('hex'),
		content: encrypted.toString('hex'),
	}
}

export const decrypt = (hash: hash): string | false => {
	try {
		const decipher = crypto.createDecipheriv(
			algorithm,
			secretKey,
			Buffer.from(hash.iv, 'hex')
		)
		try {
			const decrpyted = Buffer.concat([
				decipher.update(Buffer.from(hash.content, 'hex')),
				decipher.final(),
			])

			return decrpyted.toString()
		} catch (error) {
			return false
		}
	} catch (error) {
		return false
	}
	return false
}
