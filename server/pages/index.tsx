export default function Index({redirect}) {
  return (
    <>
      <h1>
        Digital Garden Builder Server
         
      </h1>
      {redirect ? <a href={redirect}>Complete Login</a>: <p>If you tried to login and end up here unclear what to do next, sorry. The URL to redirect back should be in state query param, it's not though...</p>}
    </>
    
  )
}

export async function getServerSideProps({ query }) {
  const { token, state } = query;
  let redirect = token && state ? `${state}?token=${token}` : '';
  return {
    props: 
      {redirect}
  }
}