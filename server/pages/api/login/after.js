import { getOctokit, getAuth } from '../../../auth';
let auth = getAuth();
export default async (req, res) => {
    const { code } = req.query;
    try {
        const oauthAuthentication = await auth({ type: "oauth", code });
        const { token } = oauthAuthentication;
        let octokit = getOctokit(token);
        let repos = await octokit.apps.listInstallationsForAuthenticatedUser();
        let { data } = repos;
        let installIds = [];
        let installs = []
        if (data.installations) {
            installIds = data.installations.map(d => d.id);
            installs = await Promise.all(installIds.map(installation_id => {
                return  
                octokit.apps.getInstallation({
                    installation_id,
                }).then(r => r.data);
            }))
        }
        res.json({ token, installIds,installs });
    } catch (error) {
        res.status(400).json({ error: { name: error.name, status: error.status } });
    }
};