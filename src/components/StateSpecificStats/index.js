import {useEffect, useState} from 'react'
import LoaderSpinner from '../LoaderSpinner'
import FailureView from '../FailureView'
import DataContainer from '../DataContainer'
import DistrictData from '../DistrictData'
import DataVisualization from '../DataVisualization'

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const StateSpecificStats = props => {
  const [apiResponse, setApiResponse] = useState({
    data: null,
    apiStatus: apiStatusConstants.initial,
    error: null,
  })
  const history = props
  const {match} = history
  const {params} = match
  const {stateCode} = params

  const state = statesList.find(eachItem => eachItem.state_code === stateCode)
  const stateName = state.state_name

  useEffect(() => {
    setApiResponse({apiStatus: apiStatusConstants.inProgress})

    const getCovidState = async () => {
      const url = 'https://apis.ccbp.in/covid19-state-wise-data'
      const options = {
        method: 'GET',
      }

      const response = await fetch(url, options)
      const dataResponse = await response.json()
      const stateSpecificObj = dataResponse[stateCode]
      const {total} = stateSpecificObj
      const confirmed = total.confirmed ? total.confirmed : 0
      const deceased = total.deceased ? total.deceased : 0
      const recovered = total.recovered ? total.recovered : 0
      const tested = total.tested ? total.tested : 0
      const active = confirmed - (deceased + recovered)
      const {meta} = stateSpecificObj
      const districts = stateSpecificObj
      const districtObj = districts.districts
      const districtArray = Object.entries(districtObj).map(e => ({
        [e[0]]: e[1],
      }))

      const {date, population, lastUpdated = meta.last_updated} = meta

      const stateObj = {
        stateName,
        stateCode,
        confirmed,
        deceased,
        recovered,
        tested,
        active,
        date,
        population,
        lastUpdated,
        districtArray,
      }

      if (response.ok === true) {
        setApiResponse({
          data: stateObj,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        setApiResponse({
          apiStatus: apiStatusConstants.failure,
          error: response.error_msg,
        })
      }
    }
    getCovidState()
  }, [])

  const renderStateName = () => {
    const {data} = apiResponse
    const {lastUpdated} = data

    return (
      <div className="displayProps">
        <div className="stateName-heading-container">
          <h1 className="stateName-heading">{stateName}</h1>
        </div>
        <p className="lastUpdated">Last updated on {lastUpdated}</p>
      </div>
    )
  }

  const renderTestedComp = () => {
    const {data} = apiResponse
    const {tested} = data
    return (
      <div className="testedProps">
        <p className="tested-sub-heading">Tested</p>
        <h1 className="tested-data">{tested}</h1>
      </div>
    )
  }

  function getDistrictName(eachItem) {
    const districtNameArray = Object.keys(eachItem)
    return districtNameArray[0]
  }

  const renderDistrictsData = () => {
    const {data} = apiResponse
    const {districtArray} = data

    return (
      <ul className="districtData-con">
        {districtArray.map(eachItem => (
          <DistrictData
            districtDetails={eachItem}
            key={getDistrictName(eachItem)}
            districtName={getDistrictName(eachItem)}
          />
        ))}
      </ul>
    )
  }
  const renderDataContainer = () => {
    const {data} = apiResponse

    return <DataContainer data={data} />
  }

  const renderAllViews = () => {
    const {apiStatus} = apiResponse

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderSpinner data-testId="stateDetailsLoader" />

      case apiStatusConstants.success:
        return (
          <>
            <div className="inner-flexProps">
              {renderStateName()}
              {renderTestedComp()}
            </div>
            {renderDataContainer()}
            <h1 className="district-heading">Top Districts</h1>
            {renderDistrictsData()}
            <DataVisualization stateCode={stateCode} />
          </>
        )

      case apiStatusConstants.failure:
        return <FailureView />

      default:
        return null
    }
  }

  return (
    <div className="bg-container">
      <Header />
      <div className="flex-container">{renderAllViews()}</div>
    </div>
  )
}

export default StateSpecificStats
