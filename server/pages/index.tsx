import {useRouter} from 'next/router';

export default function Index() {
  const { query } = useRouter();
  const { token, state } = query;
  let redirect = token && state ? `${state}?token=${token}` : '';
  return (
    <div className="w-4/5 md:w-1/2 mx-auto">
      <h1 className="font-bold text-4xl">
      Digital <span className="bg-green-400">Garden Builder</span>  
         
      </h1>
      <section className={'bg-white shadow-md rounded p-8 '}>
      <h2 className={''}>Build Your Garden</h2>
        <p className={'text-xl'}>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSceXRwG_NQ-5sy1lcP613uS_BH2H1JqhuGOzOWbai7XClK3Cw/viewform">
                Sign Up For Early Access
            </a>
        </p>
      </section>
      </div>
  )
  return (
    <>
      <h1>
        Digital Garden Builder Server 
      </h1>
    {redirect && <a href={redirect}>Complete Login</a>}
    <section>
        
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

