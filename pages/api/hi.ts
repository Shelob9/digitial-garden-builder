import { getSession } from "next-auth/client";
import { NextApiRequest, NextApiResponse } from "next";

//Says Hi to Roy, or the logged in user.
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Cache-Control", "s-maxage=17");
	res.status(200).json({ hi: session ? session.user.name : "Roy" });
};
