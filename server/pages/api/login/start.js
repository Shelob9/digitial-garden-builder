let redirect =
    process.env.GITHUB_REDIRECT || `https://docs.digitalgardenbuilder.app//api/login/after`;
    const clientId = process.env.GITHUB_ID;

export default async (req, res) => {
    res.redirect(
        301,
        `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
            redirect
        )}`
    );
};
