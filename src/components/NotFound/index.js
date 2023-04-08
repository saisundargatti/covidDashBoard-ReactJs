import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="bg-container">
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dlvc5pfmx/image/upload/v1680596039/failure_zp3qtm.png"
        alt="not-found-pic"
      />
      <h1 className="failure-heading">PAGE NOT FOUND</h1>
      <p className="failure-paragraph">
        We are sorry, the page you requested could not be found
      </p>
      <p className="failure-paragraph">Please got back to the Home Page</p>
      <Link to="/">
        <button type="button" className="failure-button">
          Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
