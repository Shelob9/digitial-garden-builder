import Image from 'next/image'
import Section from "../components/Section"
import PageLayout from "../components/PageLayout"
export default function Index() {
  return (
    <PageLayout title={<>Digital <span className="bg-green-400">Garden Builder</span></>}>
      
        <Section heading={'Grow Your Ideas'} className={'shadowed-box'} id={'what'}>
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
        
        <Section heading={'Build Your Garden'} className={'shadowed-box'} id={'sign-up'}>
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
        <Section heading={'Connect Notes'} className={'shadowed-box'} id={'features'}>
          <div className={'md:grid grid-cols-2 gap-4 shadowed-box'}>
            <div>
              <h3>Click a link to a note. It opens next to the note.</h3>
            </div>
            <div>
                  <Image src="/dgb-three-columns.jpg" alt="Three column note view layout." width="900" height="544" layout={'responsive'} />
            </div>
          </div>
          <div className={'md:grid grid-cols-2 gap-4 shadowed-box'}>
            <div>
              <h3>Edit Your Notes</h3>
            </div>
            <p>Use wiki-style, double-bracket links to connect notes.</p>
            <div>
                  <Image src="/cat800.jpg" alt="Note editor" width="900" height="544" layout={'responsive'} />
            </div>
          </div>
          <div className={'md:grid grid-cols-2 gap-4 shadowed-box'}>
            <div>
              <h3>See a graph of the links.</h3>
            </div>
            <div>
                  <Image src="/cat600.jpg" alt="Graph of links" width="900" height="544" layout={'responsive'} />
            </div>
          </div>
        </Section>
      </PageLayout>
  )
}

