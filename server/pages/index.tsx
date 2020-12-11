export default function Index({redirect}) {
  return (
    <>
      <p>
        Digital Garden Builder Server
         
      </p>
      {redirect && <a href={redirect}>Complete Login</a>}
    </>
    
  )
}

export async function getServerSideProps({ query }) {
  const { token, state } = query;
  let redirect = `${state}?token=${token}`
  return {
    props: 
      {redirect}
  }
}