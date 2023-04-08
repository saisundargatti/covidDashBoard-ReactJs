import {Link} from 'react-router-dom'
import './index.css'

const DataRow = props => {
  const {stateDetails} = props

  const {
    name,
    confirmed,
    deceased,
    recovered,
    population,
    active,
    stateCode,
  } = stateDetails

  return (
    <div className="data-row">
      <Link to={`/state/${stateCode}`} className="state-link">
        <p className="name">{name}</p>
      </Link>

      <p className="number red">{confirmed}</p>

      <p className="number blue">{active}</p>

      <p className="number green">{recovered}</p>

      <p className="number grey">{deceased}</p>

      <p className="number popColor">{population}</p>
    </div>
  )
}

export default DataRow
