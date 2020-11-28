import { FC } from 'react';
import Header from './Header';
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
      </div>
    )
}
  
export default Layout;