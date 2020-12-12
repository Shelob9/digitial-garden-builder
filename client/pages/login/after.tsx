import Layout from "components/Layout";
import Link from "next/link";
import useUserToken from "../../hooks/useUserCookie";
export async function getServerSideProps({  query }) {
	const { token } = query;
	return {
		props: {
			token: token ?? ''
		}
	}

}
export default function After(props) {
	const { token } = useUserToken({ token: props.token });
	return (
		<Layout pageDisplayTitle={'Login'}>
			<section>
				{token ? <div>Logged in with token {token}</div> : <div>No token, that is bad.</div>}
			</section>
			<section>
				<ul>
					<li><Link href={'/'}><a>Notes</a></Link></li>
					<li><Link href={'/settings'}><a>Settings</a></Link></li>
					<li><a href={'https://docs.digitalgardenbuilder.app'}>Documentation</a></li>
				</ul>
			</section>
			
		</Layout>
	)
};
