import Link from "next/link";

 const PageLayout = ({children,title}) => {
    return (
      <div className="w-4/5 md:w-1/2 mx-auto" id={'index-page'}>
          <h1>
            {title}
        </h1>
        <main>
          {children}
        </main>
        <footer>
        <nav className="space-x-4 ">
            <a
              href={'https://docs.google.com/forms/d/e/1FAIpQLSceXRwG_NQ-5sy1lcP613uS_BH2H1JqhuGOzOWbai7XClK3Cw/viewform'} className="inline-block">
              Sign Up
            </a>
            <Link href={'/about'}>
              <a className="inline-block">About</a>
            </Link>
            <Link href={'/privacy'}>
              <a className="inline-block">Privacy</a>
            </Link>
        </nav>
        </footer>
      </div>
    )
}
  
export default PageLayout;