import Link from "next/link";
import { FC, Fragment } from "react";
import useIsLoggedInAuthorized from "../hooks/useIsLoggedAuthorized";
import DarkModeToggle from "./DarkModeToggle";
import { useNoteSettings } from "./useNotes";

const Header: FC<{
  BeforeControls?: () => JSX.Element;
  pageDisplayTitle: string;
  statusMessage?: string;
  FirstControl?: () => JSX.Element;
}> = ({ BeforeControls,statusMessage,FirstControl}) => {
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
          {FirstControl ? <FirstControl />: <Fragment/>}
          <DarkModeToggle />
          </div>
        </header>

      </>
      
      
    )
}
  
export default Header;