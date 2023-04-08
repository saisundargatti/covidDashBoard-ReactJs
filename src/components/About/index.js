import {useState, useEffect} from 'react'
import LoaderSpinner from '../LoaderSpinner'
import FaqItem from '../FaqItem'
import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'
import './index.css'

const apiConstantsStatus = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const About = () => {
  const [apiResponse, setApiResponse] = useState({
    apiStatus: apiConstantsStatus.initial,
    data: null,
    error: null,
  })

  useEffect(() => {
    const getAboutData = async () => {
      setApiResponse({apiStatus: apiConstantsStatus.inProgress})
      const url = 'https://apis.ccbp.in/covid19-faqs'

      const response = await fetch(url)
      const faqData = await response.json()
      if (response.ok === true) {
        setApiResponse({apiStatus: apiConstantsStatus.success, data: faqData})
      } else {
        setApiResponse({
          apiStatus: apiConstantsStatus.failure,
        })
      }
    }
    getAboutData()
  }, [])

  const renderFaqItem = () => {
    const {data} = apiResponse

    return (
      <div className="about-container" data-testid="aboutRouteLoader">
        <h1 className="about-heading">About</h1>
        <p className="about-pg">Last update on March 28th 2021 </p>
        <h1 className="about-side-heading">
          Covid 19 vaccines be ready for the distribution
        </h1>
        <ul className="faq-container" data-testid="faqsUnorderedList">
          {data.faq.map(eachItem => (
            <FaqItem faqDetails={eachItem} key={eachItem.qno} />
          ))}
        </ul>
      </div>
    )
  }

  const renderAllViews = () => {
    const {apiStatus} = apiResponse

    switch (apiStatus) {
      case apiConstantsStatus.inProgress:
        return <LoaderSpinner />

      case apiConstantsStatus.success:
        return renderFaqItem()

      case apiConstantsStatus.failure:
        return <FailureView />

      default:
        return null
    }
  }

  return (
    <div className="bg-container">
      <Header />
      {renderAllViews()}
      <Footer />
    </div>
  )
}

export default About
