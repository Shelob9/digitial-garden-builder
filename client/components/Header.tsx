import Link from "next/link";
import { FC } from "react";
import useIsLoggedInAuthorized from "../hooks/useIsLoggedAuthorized";
import DarkModeToggle from "./DarkModeToggle";
import { useNoteSettings } from "./useNotes";

const Header: FC<{
  BeforeControls?: () => JSX.Element;
  pageDisplayTitle: string;
  statusMessage?: string;

}> = ({ BeforeControls,statusMessage }) => {
  const { isLoggedIn, isSessionLoading } = useIsLoggedInAuthorized();
  const { siteName } = useNoteSettings();
  return (
      <>
        <header id="header" role="banner">
          <a aria-current="page" className="" href="/">
            <span>{siteName}</span>
        </a>
        {statusMessage && <span>{statusMessage}</span>}
        {BeforeControls && <BeforeControls /> }
          <div className={'controls'}>
          <DarkModeToggle />
          {isSessionLoading
            ? <span style={{ width: '42px' }} /> : <Link href={isLoggedIn ? '/notes/new' : '/login'}><button>{isLoggedIn ? "New" : "Login"}</button></Link>
          }
          </div>
        </header>

      </>
      
      
    )
}
  
export default Header;