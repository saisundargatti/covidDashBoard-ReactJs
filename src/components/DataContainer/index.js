import './index.css'

const DataContainer = props => {
  const {data} = props
  const updatedData = {
    confirmed: data.confirmed,
    deceased: data.deceased,
    recovered: data.recovered,
    active: data.active,
  }

  const {confirmed, deceased, recovered, active} = updatedData

  return (
    <div className="rsp-con">
      <div
        className="data-card confirmed"
        data-testid="countryWideConfirmedCases"
      >
        <h1 className="data-heading red">Confirmed</h1>
        <img
          src="https://res.cloudinary.com/dlvc5pfmx/image/upload/v1680267235/check-mark_1_d7oryb.png"
          alt="confirmed"
        />
        <h1 className="data red">{confirmed}</h1>
      </div>

      <div className="data-card active" data-testid="countryWideActiveCases">
        <h1 className="data-heading blue">Active</h1>
        <img
          src="https://res.cloudinary.com/dlvc5pfmx/image/upload/v1680267364/protection_1_qnz2dz.png"
          alt="active"
        />
        <h1 className="data blue">{active}</h1>
      </div>
      <div
        className="data-card recovered "
        data-testid="countryWideRecoveredCases"
      >
        <h1 className="data-heading green">Recovered</h1>
        <img
          src="https://res.cloudinary.com/dlvc5pfmx/image/upload/v1680267476/recovered_1_dwrhzu.png"
          alt="recovered"
        />
        <h1 className="data green">{recovered}</h1>
      </div>
      <div
        className="data-card deceased"
        data-testid="countryWideDeceasedCases"
      >
        <h1 className="data-heading grey">Deceased</h1>
        <img
          src="https://res.cloudinary.com/dlvc5pfmx/image/upload/v1680267552/breathing_1_draeuz.png"
          alt="deceased"
        />
        <h1 className="data grey">{deceased}</h1>
      </div>
    </div>
  )
}

export default DataContainer
