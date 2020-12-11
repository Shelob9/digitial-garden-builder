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
	return (<div>Logged In with token {token}</div>)
};
