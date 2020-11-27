import "./header.css";
import DarkModeToggle from "./DarkModeToggle";
const Header = () => {

    return (
      <header>
        <a aria-current="page" className="" href="/gatsby-digital-garden/">
          <h3>Digital Garden</h3>
        </a>
        <DarkModeToggle />
        </header>
    )
}
  
export default Header;