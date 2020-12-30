import { FC } from "react"

const Section: FC<{ heading: string; children: any, className?:string }> = ({ heading, children,className }) => (
  <section className={className}>
    <h2>{heading}</h2>
    {children}
  </section>
)

export default function Index() {
  return (
    <div className="w-4/5 md:w-1/2 mx-auto" id={'index-page'}>
      <h1 >
        Digital <span className="bg-green-400">Garden Builder</span>  
      </h1>
      <Section heading={'Grow Your Ideas'} className={'shadowed-box'}>
        <div className={'md:grid grid-cols-3 gap-4'}>
          <div className={'shadowed-box'}>
            <h3 className={'font-bold text-4xl'}>Grow</h3>
            <p>A digital garden is a public notebook for your in progress writing.</p>
          </div>
          <div className={'shadowed-box'}>
          <h3 className={'font-bold text-4xl'}>Collaborate With Others</h3>
            <p>Additional words should be here.</p>
          </div>
          <div className={'shadowed-box'}>
          <h3 className={'font-bold text-4xl'}>Publish</h3>
            <p>Share on social, publish to your WordPress site or Medium.</p>
          </div>
          </div>
      </Section>
      
      <Section heading={'Build Your Garden'} className={'shadowed-box'}>
        <ul>
          <li><a className={'btn-green'} href="https://docs.google.com/forms/d/e/1FAIpQLSceXRwG_NQ-5sy1lcP613uS_BH2H1JqhuGOzOWbai7XClK3Cw/viewform">
                  Sign Up For Early Access
              </a></li>
              <li>
                <a href="https://docs.digitalgardenbuilder.app">
                  Read the documentation and try a demo.
                </a>
              </li>
              
          </ul>
      </Section>
      
      </div>
  
  
    
  )
}

