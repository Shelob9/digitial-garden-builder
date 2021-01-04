import useSaveState from "hooks/useSaveState";
import Link from "next/link";
import { FC, Fragment } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { useNoteSettings } from "./useNotes";

const Header: FC<{
  BeforeControls?: () => JSX.Element;
  pageDisplayTitle: string;
  FirstControl?: () => JSX.Element;
}> = ({ BeforeControls, FirstControl }) => {
  const { statusMessage,isSaving } = useSaveState();
  const { siteName } = useNoteSettings();
  return (
      <>
        <header id="header" role="banner">
          <a aria-current="page" className="" href="/">
            <span>{siteName}</span>
          </a>
        {statusMessage && <span className={isSaving ? 'animate-pulse': undefined}>{statusMessage}</span>}
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