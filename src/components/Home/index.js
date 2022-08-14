import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdSort} from 'react-icons/md'
import Header from '../Header'
import HomeCarousals from '../HomeCarousals'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  loading: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    resturantsList: '',
    apiStatus: apiStatusConstant.initial,
    activePage: 1,
  }

  componentDidMount() {
    this.getRestaurantsData()
  }

  getRestaurantsData = async () => {
    this.setState({apiStatus: apiStatusConstant.loading})
    const {activePage} = this.state
    const LIMIT = 9
    const offset = (activePage - 1) * LIMIT
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log('ok')
      this.setState({apiStatus: apiStatusConstant.success})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {resturantsList} = this.state
    return (
      <div className="restaurants-list-container">
        <div className="restaurant-list">
          <h1 className="title">Popular Restaurants</h1>
          <div className="text-filter-container">
            <p className="restaurant-description">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="filter-container">
              <MdSort />
              <h1 className="title-in-filter">Sort by Lowest</h1>
              <select>
                {sortByOptions.map(eachOption => (
                  <option>{eachOption.displayText}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderRestaurantsStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.loading:
        return this.renderLoadingView()
      case apiStatusConstant.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <HomeCarousals />
        {this.renderRestaurantsStatusView()}
      </div>
    )
  }
}

export default Home
