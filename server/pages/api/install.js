import {  getAuth } from '../../../auth';
let auth = getAuth();
export default async (req, res) => {
    const installationAuthentication = await auth({ type: "installation" });
    res.json({installationAuthentication})
}