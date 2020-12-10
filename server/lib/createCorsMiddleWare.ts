import initMiddleware from './init-middleware'
import Cors from 'cors'

export default function createCorsMiddleWare(methods: string[]) {
	return initMiddleware(
		Cors({
			methods,
		})
	)
}
