export default function Index({redirect}) {
  return (
    <>
      <h1>
        Digital Garden Builder Server
         
      </h1>
      {redirect && <a href={redirect}>Complete Login</a>}
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