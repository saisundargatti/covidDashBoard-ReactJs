import {Component} from 'react'

import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

import LoaderSpinner from '../LoaderSpinner'
import Footer from '../Footer'
import FailureReview from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class DataVisualization extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    data: '',
  }

  componentDidMount() {
    this.getTimelinesData()
  }

  getTimelinesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const id = this.props
    const {stateCode} = id

    const url = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()

    const key = Object.keys(data)
    const keyObj = data[key]
    const {dates} = keyObj

    const timelineArray = Object.keys(dates).map(eachItem => ({
      date: eachItem,
      confirmed: dates[eachItem].total.confirmed
        ? dates[eachItem].total.confirmed
        : 0,
      deceased: dates[eachItem].total.deceased
        ? dates[eachItem].total.deceased
        : 0,
      recovered: dates[eachItem].total.recovered
        ? dates[eachItem].total.recovered
        : 0,
      tested: dates[eachItem].total.tested ? dates[eachItem].total.tested : 0,
      active:
        dates[eachItem].total.confirmed -
        (dates[eachItem].total.deceased + dates[eachItem].total.recovered),
    }))

    const lastTenObjects = timelineArray.slice(-10)

    if (response.ok === true) {
      this.setState({
        data: lastTenObjects,
        dataArray: timelineArray,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderBarChart = () => {
    const {data} = this.state
    return (
      <div>
        <BarChart
          width={800}
          height={450}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="confirmed"
            fill="#9A0E31"
            className="bar"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
      </div>
    )
  }

  renderLineChart = key => {
    const {dataArray} = this.state
    const colorObj = {
      confirmed: 'red',
      recovered: 'green',
      deceased: 'grey',
      active: 'blue',
      tested: 'purple',
    }
    const color = colorObj[key]
    return (
      <div className={`${key} chartProps`}>
        <LineChart
          width={730}
          height={250}
          data={dataArray}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={`${key}`} stroke={`${color}`} />
        </LineChart>
      </div>
    )
  }

  renderCharts = () => (
    <div>
      {this.renderBarChart()}
      <h1 className="chartHeading">Daily Spread Trends</h1>
      <div className="displayProps" data-testid="lineChartsContainer">
        {this.renderLineChart('confirmed')}
        {this.renderLineChart('active')}
        {this.renderLineChart('recovered')}
        {this.renderLineChart('deceased')}
        {this.renderLineChart('tested')}
      </div>
      <Footer />
    </div>
  )

  renderAllViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderSpinner />

      case apiStatusConstants.success:
        return this.renderCharts()

      case apiStatusConstants.failure:
        return <FailureReview />

      default:
        return null
    }
  }

  render() {
    return <div>{this.renderAllViews()}</div>
  }
}

export default DataVisualization
