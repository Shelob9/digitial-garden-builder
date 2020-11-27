import Link from 'next/link';
import React, { FC, ReactNode, useEffect, useRef } from 'react';
import useIsLoggedIn from '../hooks/useIsLoggedAuthorized';
import Cms from './Cms';
import Main from './Main';
import Skelton from './Skelton';
import { useRouter } from 'next/router'

let navItems :{ to: string, label: string }[] = [
    { to: '/cms/files', label: 'Item List' },
    { to: '/cms/new', label: 'New Item' },
]
const CmsHeader = () => (
    <header className={'container mx-auto flex-auto relative border-t border-gray-200 dark:border-gray-800'}>


        <ul className="flex">
            {navItems.map(({ label, to }) => (
                <li className="mr-6" key={to}>
                    <Link href={to}>
                        <a className="text-blue-500 hover:text-blue-800" href="#">
                            {label}
                        </a>
                    </Link> 
              </li>
            ))}
            </ul>
    </header>
)
const CmsLayout: FC<{ children: ReactNode, TopBar: () => JSX.Element }> = ({ children, TopBar }) => {
    
    const {isLoggedIn,isSessionLoading} = useIsLoggedIn()
    const router = useRouter();

    //Once session is loaded:
    //Redirect to login if not logged in
    useEffect(() => {
        if (isSessionLoading) {
            return;
        }
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isSessionLoading,isLoggedIn]);
    useEffect(() => {
        if (document && document.getElementById('__next')) {
            document.getElementById('__next')
                .setAttribute("style", "width:100%");
        }
    }, []);

    return (
        <>
            <CmsHeader />
              <Main>
                <Cms>
                    <TopBar />
                    {isSessionLoading ? <Skelton /> : children}
                </Cms>      
            </Main>
        </>
    )
};

export default CmsLayout;