import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdSort} from 'react-icons/md'
import {BsStarFill} from 'react-icons/bs'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'
import Header from '../Header'
import Footer from '../Footer'
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
    selectedSortBy: sortByOptions[0].value,
    searchInput: '',
  }

  componentDidMount() {
    this.getRestaurantsData()
  }

  getRestaurantsData = async () => {
    this.setState({apiStatus: apiStatusConstant.loading})
    const {activePage, selectedSortBy} = this.state
    const LIMIT = 9
    const offset = (activePage - 1) * LIMIT
    console.log(offset)
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortBy}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const restaurantsData = data.restaurants.map(eachItem => ({
      costForTwo: eachItem.cost_for_two,
      cuisine: eachItem.cuisine,
      groupByTime: eachItem.group_by_time,
      hasOnlineDelivery: eachItem.has_online_delivery,
      hasTableBooking: eachItem.has_table_booking,
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      isDeliveringNow: eachItem.is_delivering_now,
      location: eachItem.location,
      menuType: eachItem.menu_type,
      name: eachItem.name,
      opensAt: eachItem.opens_at,
      userRating: eachItem.user_rating,
    }))
    console.log(restaurantsData)
    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstant.success,
        resturantsList: restaurantsData,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onDecrementThePageNo = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState({activePage: activePage - 1}, this.getRestaurantsData)
    }
  }

  onIncrementThePageNo = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState({activePage: activePage + 1}, this.getRestaurantsData)
    }
  }

  changeActiveSortOption = event => {
    this.setState({selectedSortBy: event.target.value}, this.getRestaurantsData)
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  getResultedData = searchInput => {
    const {resturantsList} = this.state
    const resultedData = resturantsList.filter(eachItem =>
      eachItem.name.toLowercase().includes(searchInput.toLowercase()),
    )
    return resultedData
  }

  renderRestaurantsList = () => {
    const {resturantsList} = this.state
    return (
      <ul
        className="restaurants-list-container"
        testid="restaurants-list-loader"
      >
        {resturantsList.map(eachItem => (
          <li
            key={eachItem.id}
            className="restaurant-item"
            testid="restaurant-item"
          >
            <img
              src={eachItem.imageUrl}
              className="restaurant-image"
              alt="restaurant"
            />
            <div className="restaurant-details">
              <h1 className="restaurant-name">{eachItem.name}</h1>
              <p className="restaurant-type">{eachItem.cuisine}</p>
              <div className="rating-container">
                <BsStarFill className="star-icon" />
                <p className="rating">{eachItem.userRating.rating}</p>
                <p className="count-rating">{`(${eachItem.userRating.total_reviews} ratings)`}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderSuccessView = () => {
    const {resturantsList, selectedSortBy, activePage} = this.state
    console.log(activePage)
    return (
      <div className="restaurants-container">
        <div className="restaurant-list">
          <h1 className="title">Popular Restaurants</h1>
          <div className="text-filter-container">
            <p className="restaurant-description">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="filter-container">
              <MdSort />
              <h1 className="title-in-filter">Sort by</h1>
              <select
                value={selectedSortBy}
                className="select-by-option"
                onChange={this.changeActiveSortOption}
              >
                {sortByOptions.map(eachOption => (
                  <option
                    key={eachOption.id}
                    className="filter-option"
                    value={eachOption.value}
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <input
            type="text"
            className="search-input"
            onChange={this.onChangeSearchInput}
          />
          <hr className="hr-line" />
        </div>
        {this.renderRestaurantsList()}
        <div className="pagination-container">
          <button
            type="button"
            className="btn-container"
            onClick={this.onDecrementThePageNo}
            testid="pagination-left-button"
          >
            <FaLessThan className="icon-style" />
          </button>
          <h1 className="pagination-text">
            <span testid="active-page-number">{`${activePage}`}</span> of 4
          </h1>
          <button
            type="button"
            className="btn-container"
            onClick={this.onIncrementThePageNo}
            testid="pagination-right-button"
          >
            <FaGreaterThan className="icon-style" />
          </button>
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
        <Footer />
      </div>
    )
  }
}

export default Home
