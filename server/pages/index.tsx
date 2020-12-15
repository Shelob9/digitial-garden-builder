import {useRouter} from 'next/router';
export default function Index() {
  const { query } = useRouter();
  const { token, state } = query;
  let redirect = token && state ? `${state}?token=${token}` : '';
  return (
    <>
      <h1>
        Digital Garden Builder Server 
      </h1>
    {redirect && <a href={redirect}>Complete Login</a>}
    <section>
        <h2>Build Your Garden</h2>
        <p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSceXRwG_NQ-5sy1lcP613uS_BH2H1JqhuGOzOWbai7XClK3Cw/viewform">
                Sign Up For Early Access
            </a>
        </p>
    </section>
    <section>
        <h2>Learn More</h2>
        <p>
            <a href="https://docs.digitalgardenbuilder.app/notes/digital-garden-builder">
                Documentation
            </a>
        </p>
    </section>
    </>
    
  )
}

