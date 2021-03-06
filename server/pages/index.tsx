import Image from 'next/image'
import Section from "../components/Section"
import PageLayout from "../components/PageLayout"
export default function Index() {
  return (
    <PageLayout title={<>Digital <span className="bg-green-400">Garden Builder</span></>}>
      
        <Section heading={'Connect Notes'} className={'shadowed-box'} id={'features'}>
          <div className={'md:grid grid-cols-2 gap-4 shadowed-box'}>
            <div>
            <h3>Click a link to a note. It opens next to the note.</h3>
            <p>A digital garden is a public notebook for your in progress writing.</p>
            </div>
            <div>
                  <Image src="/dgb-three-columns.jpg" alt="Three column note view layout." width="900" height="544" layout={'responsive'} />
            </div>
          </div>
          <div className={'md:grid grid-cols-2 gap-4 shadowed-box'}>
            <div>
            <h3>Edit Your Notes</h3>
            <p>With Markdown! Use wiki-style, double-bracket links to connect notes.</p>
            </div>
            <div>
                  <Image src="/dgb-editor.jpg" alt="Note editor" width="900" height="544" layout={'responsive'} />
            </div>
          </div>
          <div className={'md:grid grid-cols-2 gap-4 shadowed-box'}>
            
            <div>
                  <Image src="/cat600.jpg" alt="Graph of links" width="900" height="544" layout={'responsive'} />
          </div>
          <div>
              <h3>See a graph of the links.</h3>
              <p>See how everything connects.</p>
            </div>
          
          </div>
      </Section>
      
      <Section heading={'Build Your Garden'} className={'shadowed-box'} id={'sign-up'}>
            <p><a className={'btn-green'} href="https://docs.google.com/forms/d/e/1FAIpQLSceXRwG_NQ-5sy1lcP613uS_BH2H1JqhuGOzOWbai7XClK3Cw/viewform">
          Sign Up For Early Access
            </a></p>
        <div>
          <h3>Demos</h3>
          <ul>
            <li>
              <a
                href={'https://docs.digitalgardenbuilder.app/notes/digital-garden-builder'}
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href={'https://code.joshpress.net/'}
              >
                Code Meadow
              </a>
            </li>
          </ul>
        </div>
        </Section>
      </PageLayout>
  )
}

