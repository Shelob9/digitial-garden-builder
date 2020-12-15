export const getAccessTokenFromSession = (
	session: { accessToken: string } | undefined
): string | undefined => {
	if (session && session.accessToken) {
		return session.accessToken;
	}
	return undefined;
};
