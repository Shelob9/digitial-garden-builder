export default function Index({redirect}) {
  return (
    <>
      <h1>
        Digital Garden Builder Server
         
      </h1>
      {redirect ? <a href={redirect}>Complete Login</a> : <p />}
      <section>
        <h2>Would You Like A Digital Garden?</h2>
        <a href="https://forms.gle/ji34YzzdgzjTgXkJ8">Please fill out this form.</a>
      </section>
       
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