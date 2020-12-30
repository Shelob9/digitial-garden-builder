import Layout from "components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import useUserToken from "../../hooks/useUserCookie";

const isServer = () => typeof window === `undefined`;

//Return from login redirect and store token in a cookie.
const After =  ()  => {
	//New JWT token should be in query var token
	const { query } = useRouter();
	if (isServer()) {
		return <div />
	}
	console.log(2,query);
	//This hook will put token into a cookie.
	//@ts-ignore
	const { token } = useUserToken({ token: query.token ? query.token : ''  });
	return (
		<Layout pageDisplayTitle={'Login'}>
			<section>
				{token ? <div>Logged in with token {token}</div> : <div>No token, that is bad.</div>}
			</section>
			<section>
				<ul>
					<li><Link href={'/'}><a>Notes</a></Link></li>
					<li><Link href={'/settings'}><a>Settings</a></Link></li>
					<li><Link href={'/login/logout'}><a>Logout</a></Link></li>
					<li><a href={'https://docs.digitalgardenbuilder.app'}>Documentation</a></li>
				</ul>
			</section>
			
		</Layout>
	)
};

export default After; 