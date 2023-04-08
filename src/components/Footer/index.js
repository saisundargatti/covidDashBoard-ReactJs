import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <Link to="/" className="nav-link">
        <h1 className="footer-heading">
          COVID19
          <span className="india-text">INDIA</span>
        </h1>
      </Link>

      <p className="footer-paragraph">
        we stand with everyone fighting on the front lines
      </p>
      <ul className="icon-container">
        <li>
          <VscGithubAlt className="icon-design" />
        </li>
        <li>
          <FiInstagram className="icon-design" />
        </li>
        <li>
          <FaTwitter className="icon-design" />
        </li>
      </ul>
    </div>
  )
}
