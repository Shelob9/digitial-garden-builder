const auth,{getOctokit} = require('../../auth');
export default async (req, res) => {
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