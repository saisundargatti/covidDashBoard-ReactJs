import {Link} from 'react-router-dom'

import {AiOutlineRight} from 'react-icons/ai'
import './index.css'

const SearchOptions = props => {
  const {eachState} = props

  return (
    <Link to={`/state/${eachState.state_code}`} className="option-link">
      <p className="option-name">{eachState.state_name}</p>
      <button type="button" className="option-button">
        <div className="option-holder">
          <p className="option-code">{eachState.state_code}</p>
          <AiOutlineRight />
        </div>
      </button>
    </Link>
  )
}

export default SearchOptions
