import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import './index.css'
import Header from '../Header'

const apiStatusConstant = {
  initial: 'INITIAL',
  loading: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class RestaurantDetails extends Component {
  state = {restaurantData: '', apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getRestaurantsDetails()
  }

  getRestaurantsDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.loading})
    const url = 'https://apis.ccbp.in/restaurants-list/2200153'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const restaurantDetails = {
      rating: data.rating,
      id: data.id,
      name: data.name,
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      imageUrl: data.image_url,
      reviewsCount: data.reviews_count,
      opensAt: data.opens_at,
      location: data.location,
      itemsCount: data.items_count,
      foodItems: data.food_items.map(eachItem => ({
        cost: eachItem.cost,
        foodType: eachItem.food_type,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
        rating: eachItem.rating,
      })),
    }
    console.log(restaurantDetails)
    if (response.ok === true) {
      this.setState({
        restaurantData: restaurantDetails,
        apiStatus: apiStatusConstant.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantDetailsView = () => {
    const {restaurantData} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
    } = restaurantData
    return (
      <div className="restaurant-profile-container">
        <div className="restaurant-details">
          <img src={imageUrl} alt="" className="restaurant-image" />
          <div className="details-container">
            <h1 className="restaurant-name">{name}</h1>
            <p className="restaurant-type">{cuisine}</p>
            <p className="restaurant-type">{location}</p>
            <div className="ratings-container">
              <div className="ratings-cart">
                <AiFillStar className="icon-color" />
                <p className="rating-number">{rating}</p>
              </div>
              <p className="ratings-count">{`${reviewsCount} + Ratings`}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.loading:
        return this.renderLoadingView()
      case apiStatusConstant.success:
        return this.renderRestaurantDetailsView()
      default:
        return null
    }
  }

  render() {
    const {restaurantData} = this.state
    console.log(restaurantData)
    return (
      <div>
        <Header />
        {this.renderStatusView()}
      </div>
    )
  }
}

export default RestaurantDetails
