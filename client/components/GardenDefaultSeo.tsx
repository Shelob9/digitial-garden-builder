
import { DefaultSeo } from 'next-seo';
import { useNoteSettings } from './useNotes';

const GardenDefaultSeo = () => {
  const {siteName,
    siteTwitter,
    authorName,
    authorTwitter,} = useNoteSettings();
  return (
    <DefaultSeo
        title={ siteName }
        titleTemplate={ `%s | ${siteName}`}
        openGraph={{
            type: 'website',
            url: '',
            locale: 'en_US',
            site_name:siteName
        }}
        twitter={{
            handle: authorTwitter,
            site: siteTwitter,
            cardType: 'summary_large_image',
        }}
    />
  )
}
export default GardenDefaultSeo;