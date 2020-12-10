require('dotenv').config()
const fs = require('fs');
const clientId = process.env.GITHUB_ID;
const clientSecret = process.env.GITHUB_SECRET;
const privateKey = fs.readFileSync("./private-key.pem").toString();
const { createAppAuth } = require("@octokit/auth-app");
const { Octokit } = require('@octokit/rest');

export function getAuth(){
	return createAppAuth({
		appId: 92086,
		privateKey,
		installationId: 123,
		clientId,
		clientSecret,
	});
}

export function getOctokit(authToken) {
	return new Octokit({
		auth: authToken,
	})
}
