let redirect =
    process.env.GITHUB_REDIRECT || `http://localhost:3000/login/after`;
    const clientId = process.env.GITHUB_ID;

export default async (req, res) => {
    res.redirect(
        301,
        `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
            redirect
        )}`
    );
});
