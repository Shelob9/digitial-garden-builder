import {useTextField} from '@react-aria/textfield'
import { FC, forwardRef, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import { GardenConfig } from '../../../types/config';
import useNotes, {  NotesProvider } from '../../components/useNotes';
import useUserToken from 'hooks/useUserCookie';
import { useMemo } from 'react';
import useGardenServer from 'hooks/useGardenServer';
import { useEffect } from 'react';

const FieldWrapper = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
            {children}
        </div>
    );
}
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
        <FieldWrapper>
            <label {...labelProps}>{label}</label>
            <input {...inputProps}
                disabled={disabled}
                //@ts-ignore
                ref={ref}
            />
        </FieldWrapper>
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

const NoteSelector = ({selectedNote,setSelectedNote}) => {
    let { allSlugs } = useNotes();
    return (
        <FieldWrapper>
            <label htmlFor={"default-note"}>Default Note</label>
            <select
                value={selectedNote}
                onChange={e => {
                    setSelectedNote(e.target.value);
                }}
                id={"default-note"}
                name={"default-note"}
            >
                {allSlugs.map(slug => (
                    <option value={slug} key={slug}>{slug}</option>
                ))}
            </select>
        </FieldWrapper>
    )
}
const Settings = () => {
    const { token } = useUserToken({});
    const { createUrl, createHeaders } = useGardenServer({ token });
    
    const [settings,setSettings] = useState<GardenConfig>({
        defaultNote: 'one',
        siteName: '',
        siteTwitter: '',
        authorName: '',
        //@ts-ignore
        authorTwitter: '',
    })

    useEffect(() => {
        fetch(createUrl('/api/settings'), {
            method: 'GET',
            headers: createHeaders()
        }).then(r => {
            r.json()
        }).then(r => {
            console.log(r);
            //@ts-ignore
            setSettings(r.settings);
        });   
    })

    const saveSettings = useMemo(() => {
        return async (settings: GardenConfig) => {
            return fetch(createUrl('/api/settings'), {
                method: 'POST',
                body: JSON.stringify({ settings }),
                headers: createHeaders()
            }).then(r => {
                r.json()
            }).then(r => console.log(r));
        }
    }, [token]);
    
    const siteNameRef = useRef();
    const siteTwitterRef = useRef();
    const authorNameRef = useRef();
    const authorTwitterRef = useRef();
    let [defaultNote, setDefaultNote] = useState<string>(settings.defaultNote ?? '');
    let [isSaving, setIsSaving] = useState(false);
    const onSave = () => {
        setIsSaving(true);
        let data: GardenConfig = Object.assign(settings, {
            defaultNote,
            //@ts-ignore
            siteName: siteNameRef.current.value,
            //@ts-ignore
            siteTwitter: siteTwitterRef.current.value,
            //@ts-ignore
            authorName: authorNameRef.current.value,
            //@ts-ignore
            authorTwitter: authorTwitterRef.current.value,
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
                }}
                >
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
                        <NoteSelector
                            selectedNote={defaultNote}
                            setSelectedNote={setDefaultNote} />
                        </section>
                        <section>
                            <button
                                disabled={isSaving}
                                onClick={(e) => {
                                e.preventDefault();
                                onSave();
                            }}>
                                {!isSaving ? 'Save' : 'Saving'}
                            </button>
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
const Page = () => {
    return (
        <NotesProvider>
            <Settings  />
        </NotesProvider>
    )
}


export default Page;