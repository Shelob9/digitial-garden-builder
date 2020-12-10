const express = require(  'express' );
require('dotenv').config()
const fs = require('fs');
const clientId = process.env.GITHUB_ID;
const clientSecret = process.env.GITHUB_SECRET;
const privateKey = fs.readFileSync("./private-key.pem").toString();
const { createAppAuth } = require("@octokit/auth-app");
const { Octokit } = require('@octokit/rest');

const auth = createAppAuth({
	appId: 92086,
	privateKey,
	installationId: 123,
	clientId,
	clientSecret,
});

 function getOctokit(authToken) {
	return new Octokit({
		auth: authToken,
	})
}



const app = express();
app.use(express.json());
app.get('/', async (req, res) => {
  res.json({
      hi: 'Roy',
  });
});

app.get('/hi', async (req, res) => {
    let { query } = req;
    res.json({
        hi: query && query.name ? query.name : 'Roy',
    });
});


let redirect =
process.env.GITHUB_REDIRECT || `http://localhost:3000/login/after`;
app.get("/login/start", async (req, res) => {
    res.redirect(
        301,
        `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
            redirect
        )}`
    );
});

app.get("/login/after", async (req, res) => {
    const { code } = req.query;
    try {
        const oauthAuthentication = await auth({ type: "oauth", code });
        const { token } = oauthAuthentication;
        let octokit = getOctokit(token);
        let repos = await octokit.apps.listInstallationsForAuthenticatedUser();
        res.json({ token, repos });
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.listen(3000);