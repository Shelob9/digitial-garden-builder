import { getSession } from 'next-auth/client'
import {settingsApiServiceFactory } from '../../serviceFactories';
import {useTextField} from '@react-aria/textfield'
import { FC, forwardRef, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import { GardenConfig } from '../../ConfigApiService';
const TextField = forwardRef((props: {
    label: string;
    defaultValue?: string;
    disabled?: boolean;
}, ref) => {
    let { label,disabled } = props;
    let { labelProps, inputProps } = useTextField(
        props,
        //@ts-ignore
        ref
    );
  
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
            <label {...labelProps}>{label}</label>
            <input {...inputProps}
                disabled={disabled}
                //@ts-ignore
                ref={ref}
            
            />
        </div>
    );
});

const saveSettings = async (settings: GardenConfig) => {
    return fetch('/api/settings', {
        method: 'POST',
        body: JSON.stringify({ settings })
    }).then(r => {
        r.json()
    }).then(r => console.log(r));
}
const Page: FC<{ settings: GardenConfig }> = ({ settings }) => {
    const siteNameRef = useRef();
    const siteTwitterRef = useRef();
    const authorNameRef = useRef();
    const authorTwitterRef = useRef();
    let [isSaving, setIsSaving] = useState(false);
    const onSave = () => {
        setIsSaving(true);
        let data = Object.assign(settings, {
            //@ts-ignore
            siteName: siteNameRef.current.value,
            //@ts-ignore
            siteTwitter: siteTwitterRef.current.value,
            //@ts-ignore
            authorName: authorNameRef.current.value,
            //@ts-ignore
            authorTwitterRef: authorTwitterRef.current.value,
        })
        saveSettings(data).then(
            () => setIsSaving(false)
        );
    }
    return (
        <>
          <Layout pageDisplayTitle={'Settings'}>
                <form id={"settings"} onSubmit={e => {
                    e.preventDefault();
                    onSave();
                }}>
                <section>
                        <TextField
                            disabled={isSaving}
                            ref={siteNameRef}
                            label={'Site Name'}
                            defaultValue={settings.siteName}
                        />
                        <TextField
                            disabled={isSaving}
                            ref={siteTwitterRef}
                            label={'Site Twitter'}
                            defaultValue={settings.siteTwitter}
                        />
                </section>
                <section>
                        <TextField
                            disabled={isSaving}
                            ref={authorNameRef}
                            label={'Author Name'}
                            defaultValue={settings.authorName}
                        />
                        <TextField
                            disabled={isSaving}
                            ref={authorTwitterRef}
                            label={'Author Twitter'}
                            defaultValue={settings.authorTwitter}
                        />
                    </section> 
                    <section>
                        <button
                             disabled={isSaving}
                            onClick={(e) => {
                             e.preventDefault();
                             onSave();
                        }}>{isSaving ? 'Save' : 'Saving'}</button>
                    </section>    
            </form>
            </Layout>
            <style jsx>{`
                #settings {
                    margin-left:42px;
                }
                #settings section {
                    margin-top: 26.25px;
                }
               
               
            `}</style>
        </>
        
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        context.res.writeHead(302, { Location: '/login' });
        context.res.end();
    }

  
    let settingsService = await settingsApiServiceFactory(
        session && session.authToken ? session.authToken : null
    );

    let settings = settingsService.getSettings();
    
    return {
        props: {
            settings
        }
    }
}

export default Page;