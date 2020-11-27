import Header from './Header';
const Layout = ({children}) => {
  
    return (
      <div className="layout">
          <Header />
          <div className={'note-columns-scrolling-container'}>
            <div className={'note-columns-container'}>
                {children}
            </div>
          </div>
      </div>
    )
}
  
export default Layout;