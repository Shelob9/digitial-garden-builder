import { userJwtData } from '../types/user';
import { gitRepoDetails } from '../types/git';
import { getAccessTokenFromSession } from './UserService';
import { NextApiRequest } from 'next';
import ConfigApiService from './ConfigApiService';
import GitApi from '../GitApi';
import NotesApiService from './NotesApiService';
import getSession from '../lib/getSession';

const clientFactory = (authToken: string, repo: gitRepoDetails) => {
	return GitApi(repo, 'main', authToken);
};

export const noteApiServicefactoryFromRequest = async (
	req: NextApiRequest
): Promise<NotesApiService> => {
	return new Promise(async (resolve, reject) => {
		let session = getSession(req);
		if (session) {
			let accessToken = getAccessTokenFromSession(session);
			if (accessToken) {
				let noteService = await noteApiServicefactory(accessToken);
				return resolve(noteService);
			}
		}
		reject();
	});
};
export const noteApiServicefactory = async (
	authToken?: string
): Promise<NotesApiService> => {
	authToken = authToken ?? process.env.GITHUB_API_TOKEN;
	let repo = {
		owner: 'shelob9',
		repo: 'garden-cms-test-data',
	};

	let noteService = new NotesApiService(
		clientFactory(authToken as string, repo)
	);
	await noteService.fetchNoteIndex();
	return noteService;
};

export const settingsApiServiceFactory = async (
	authToken: string
): Promise<ConfigApiService> => {
	let repo = {
		owner: 'shelob9',
		repo: 'garden-cms-test-data',
	};

	let service = new ConfigApiService(clientFactory(authToken, repo));
	await service.fetchConfig();
	return service;
};

/**
 * Default factory to create both services from a request
 */
export default async function factory(
	req: NextApiRequest
): Promise<{
	noteService: NotesApiService;
	configService: ConfigApiService;
	session: userJwtData | false;
}> {
	let session = getSession(req);
	return new Promise(async resolve => {
		let noteService: NotesApiService = session
			? await noteApiServicefactoryFromRequest(req)
			: await noteApiServicefactory();

		let accessToken = session ? getAccessTokenFromSession(session) : false;
		if (!accessToken) {
			accessToken = process.env.GITHUB_API_TOKEN as string;
		}
		let configService = await settingsApiServiceFactory(accessToken);
		resolve({ noteService, configService, session });
	});
}
