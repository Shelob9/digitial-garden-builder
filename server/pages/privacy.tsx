import Image from 'next/image'
import Section from "../components/Section"
import PageLayout from "../components/PageLayout"
export default function Index() {
  return (
    <PageLayout title={<>Privacy</>}>
        <Section heading={'Subtitle'} className={'shadowed-box'} >
          Words...
        </Section>
      </PageLayout>
  )
}