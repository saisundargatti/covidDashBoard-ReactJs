import {Component} from 'react'

import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import DataContainer from '../DataContainer'

import LoaderSpinner from '../LoaderSpinner'
import FailureView from '../FailureView'
import DataRow from '../DataRow'

import './index.css'

function convertObjectsDataIntoListItemsUsingForInMethod(data, statesList) {
  const resultList = []

  // getting keys of an object object
  const keyNames = Object.keys(data)

  keyNames.forEach(keyName => {
    // console.log(keyName)

    if (data[keyName]) {
      const {total} = data[keyName]
      // if the state's covid data is available we will store it or we will store 0
      const confirmed = total.confirmed ? total.confirmed : 0
      const deceased = total.deceased ? total.deceased : 0
      const recovered = total.recovered ? total.recovered : 0
      const tested = total.tested ? total.tested : 0
      const population = data[keyName].meta.population
        ? data[keyName].meta.population
        : 0

      const stateNameObj = statesList.statesList.find(
        state => state.state_code === keyName,
      )

      const stateName =
        stateNameObj !== undefined ? stateNameObj.state_name : 'Total'

      resultList.push({
        stateCode: keyName,
        name: stateName,
        confirmed,
        deceased,
        recovered,
        tested,
        population,
        active: confirmed - (deceased + recovered),
      })
    }
  })
  return resultList
}

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class DataTable extends Component {
  state = {data: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCovidData()
  }

  getCovidData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const statesList = this.props

    const response = await fetch(url)
    const data = await response.json()
    const listFormattedDataUsingForInMethod = convertObjectsDataIntoListItemsUsingForInMethod(
      data,
      statesList,
    )
    if (response.ok === true) {
      this.setState({
        data: listFormattedDataUsingForInMethod,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getAscendingSort = () => {
    const {data} = this.state
    const ascData = data.sort((a, b) => {
      const fa = a.name.toLowerCase()
      const fb = b.name.toLowerCase()

      if (fa < fb) {
        return -1
      }
      if (fa > fb) {
        return 1
      }
      return 0
    })

    this.setState({data: ascData})
  }

  getDescendingSort = () => {
    const {data} = this.state
    const descData = data.sort((a, b) => {
      const fa = a.name.toLowerCase()
      const fb = b.name.toLowerCase()

      if (fa > fb) {
        return -1
      }
      if (fa < fb) {
        return 1
      }
      return 0
    })

    this.setState({data: descData})
  }

  renderTable = () => {
    const {data} = this.state
    const updatedData = data.filter(eachItem => eachItem.name !== 'Total')
    return (
      <div className="table-container" data-testid="stateWiseCovidDataTable">
        <ul className="table-header">
          <li className="sort-holder">
            <h1 className="state-head">State/UT</h1>

            <button
              type="button"
              data-testid="ascendingSort"
              className="sort-button"
              onClick={this.getAscendingSort}
            >
              <FcGenericSortingAsc className="sort-icon" />
            </button>
            <button
              type="button"
              data-testid="descendingSort"
              className="sort-button"
              onClick={this.getDescendingSort}
            >
              <FcGenericSortingDesc className="sort-icon" />
            </button>
          </li>
          <li>
            <h1 className="data-head">Confirmed</h1>
          </li>
          <li>
            <h1 className="data-head">Active</h1>
          </li>
          <li>
            <h1 className="data-head">Recovered</h1>
          </li>
          <li>
            <h1 className="data-head">Deceased</h1>
          </li>
          <li>
            <h1 className="data-head">Population</h1>
          </li>
        </ul>
        {updatedData.map(eachItem => (
          <DataRow stateDetails={eachItem} key={eachItem.stateCode} />
        ))}
      </div>
    )
  }

  renderAllViews = () => {
    const {apiStatus, data} = this.state
    const total = data.filter(e => e.name === 'Total')

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderSpinner data-testid="homeRouteLoader" />

      case apiStatusConstants.success:
        return (
          <>
            <DataContainer data={total[0]} />
            {this.renderTable()}
          </>
        )

      case apiStatusConstants.failure:
        return <FailureView />

      default:
        return null
    }
  }

  render() {
    return <>{this.renderAllViews()}</>
  }
}

export default DataTable
