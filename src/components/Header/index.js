import {Link} from 'react-router-dom'

import './index.css'

export default function Header() {
  return (
    <header>
      <nav className="navbar-container">
        <div>
          <Link to="/" className="nav-link">
            <h1 className="header-heading">
              COVID19
              <span className="india-text">INDIA</span>
            </h1>
          </Link>
        </div>
        <button type="button" className="hamburger-menu">
          <img
            src="https://res.cloudinary.com/dlvc5pfmx/image/upload/v1680194101/hamburger_menu_esihlv.png"
            alt="menu"
          />
        </button>

        <ul className="nav-items-container">
          <li>
            <Link to="/" className="nav-link ">
              <button type="button" className="button-class">
                <h1>Home</h1>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link ">
              <button type="button" className="button-class">
                <h1>About</h1>
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
