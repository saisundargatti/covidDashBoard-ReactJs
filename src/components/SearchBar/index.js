import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import SearchOptions from '../SearchOptions'
import './index.css'

class SearchBar extends Component {
  state = {showOptions: false, searchInput: ''}

  eventChange = event => {
    this.setState({searchInput: event.target.value, showOptions: true})
  }

  render() {
    const {searchInput, showOptions} = this.state
    const {statesList} = this.props
    const filteredList = statesList.filter(eachItem =>
      eachItem.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <>
        <div className="search-container">
          <BsSearch className="search-icon" />
          <input
            type="search"
            placeholder="Enter the State"
            className="input-container"
            onChange={this.eventChange}
            value={searchInput}
          />
        </div>

        {showOptions &&
          filteredList.map(eachItem => (
            <SearchOptions eachState={eachItem} key={eachItem.state_code} />
          ))}
      </>
    )
  }
}

export default SearchBar
