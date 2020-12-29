
export default function Index() {
  return (
    <div className="w-4/5 md:w-1/2 mx-auto" id={'index-page'}>
      <h1 >
        Digital <span className="bg-green-400">Garden Builder</span>  
      </h1>
      <section >
        <h2>Build Your Garden</h2>
          <>
              <a className={'btn-green'} href="https://docs.google.com/forms/d/e/1FAIpQLSceXRwG_NQ-5sy1lcP613uS_BH2H1JqhuGOzOWbai7XClK3Cw/viewform">
                  Sign Up For Early Access
              </a>
          </>
      </section>
      <section>
        <h2>Learn More</h2>
        <p>
            <a href="https://docs.digitalgardenbuilder.app">
                Documentation
            </a>
        </p>
    </section>
      </div>
  
  
    
  )
}

