import useIsLoggedIn from '../../hooks/useIsLoggedAuthorized'
import { getSession } from 'next-auth/client'
import { noteApiServicefactory } from '../../serviceFactories';
import {useTextField} from '@react-aria/textfield'
import { useRef } from 'react';
import Layout from '../../components/Layout';
function TextField(props) {
    let {label} = props;
    let ref = useRef();
    let {labelProps, inputProps} = useTextField(props, ref);
  
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
            <label {...labelProps}>{label}</label>
            <input {...inputProps} ref={ref} />
      </div>
    );
  }
const Page = () => {
    return (
        <>
          <Layout pageDisplayTitle={'Settings'}>
                <div id={"settings"}>
                <section>
                        <TextField label={'Site Name'}></TextField>
                        <TextField label={'Site Twitter'}></TextField>
                </section>
                <section>
                        <TextField label={'Author Name'}></TextField>
                        <TextField label={'Author Twitter'}></TextField>
                </section>              
            </div>
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

  
    let noteService = await noteApiServicefactory(
        session && session.authToken ? session.authToken : null
    );
    
    return {
        props: {
            session
        }
    }
}

export default Page;