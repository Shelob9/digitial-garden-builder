  
import Nav from './Nav'
function Layout({ children }) {
  return (
    <div className="container mx-auto">
      <Nav />
      {children}
    </div>
  )
}

export default Layout