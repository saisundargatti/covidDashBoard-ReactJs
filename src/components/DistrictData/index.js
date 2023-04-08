import './index.css'

const DistrictData = props => {
  const {districtDetails, districtName} = props
  const {total} = districtDetails[districtName]
  const confirmed = total.confirmed ? total.confirmed : '0'

  return (
    <li className="flexProps">
      <p className="districtData">{confirmed}</p>
      <p className="districtName">{districtName}</p>
    </li>
  )
}

export default DistrictData
