import { getOctokit, getAuth } from '../../../auth';
import { Octokit } from "@octokit/core";

let auth = getAuth();


export default async (req, res) => {
    const { code } = req.query;
    try {
        const oauthAuthentication = await auth({ type: "oauth", code });
        const { token } = oauthAuthentication;
        const octokit = new Octokit({ auth: token });
        let repos = await octokit.request('GET /installation/repositories')
        res.json({ token, repos });
    } catch (error) {
        res.status(400).json({ error: { name: error.name, status: error.status } });
    }
};