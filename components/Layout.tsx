import useIsLoggedInAuthorized from 'hooks/useIsLoggedAuthorized';
import { FC } from 'react';
import Header from './Header';

const Footer = () => {
  const { userDisplayName } = useIsLoggedInAuthorized();
  return (
    <footer>
      <p>Hi {userDisplayName}</p>
    </footer >
  );
}
const Layout: FC<{
  BeforeControls?: () => JSX.Element;
  pageDisplayTitle?: string;
  children: any;
  statusMessage?: string;
}> = ({ children, BeforeControls,pageDisplayTitle,statusMessage}) => {
    return (
      <div className="layout">
        <Header
          BeforeControls={BeforeControls}
          pageDisplayTitle={pageDisplayTitle ?? 'Digital Gardens' }
          statusMessage={statusMessage}
        />
        {children}
        <Footer />
      </div>
    )
}
  
export default Layout;