import Layout from "components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import useUserToken from "../../hooks/useUserCookie";
//Return from login redirect and store token in a cookie.
export default function After(props:{token:string}) {
	//New JWT token should be in query var token
	const { query } = useRouter();
	console.log(query);
	//This hook will put token into a cookie.
	//@ts-ignore
	const { token } = useUserToken({ token: query.token ? query.token : props.token  });
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

export async function getServerSideProps({ query }) {
	const { token } = query;
	return {
		props: {
			token: token ?? ''
	  }, // will be passed to the page component as props
	}
  }