import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'

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
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
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
    <div className="loader-container-data" testid="restaurant-details-loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderFoodItems = () => {
    const {restaurantData} = this.state
    const {foodItems} = restaurantData
    return (
      <div>
        <div className="food-items-container">
          <ul className="food-list-container">
            {foodItems.map(eachItem => (
              <li
                key={eachItem.id}
                className="food-item-container"
                testid="foodItem"
              >
                <img
                  src={eachItem.imageUrl}
                  alt="food item"
                  className="food-item-image"
                />
                <div className="food-item-details">
                  <h1 className="food-item-name">{eachItem.name}</h1>
                  <div className="cost-container">
                    <BiRupee className="cost-icon" />
                    <p className="food-cost">{eachItem.cost}</p>
                  </div>
                  <div className="ratings-container">
                    <AiFillStar className="star-icon" />
                    <p className="food-item-rating">{eachItem.rating}</p>
                  </div>
                  <button type="button" className="add-button">
                    ADD
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  renderRestaurantDetailsView = () => {
    const {restaurantData} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantData
    return (
      <div>
        <div className="restaurant-profile-container">
          <div className="restaurant-details-data">
            <img
              src={imageUrl}
              alt="restaurant"
              className="restaurant-image-data"
            />
            <div className="details-container-data">
              <h1 className="restaurant-name-data">{name}</h1>
              <p className="restaurant-type-data">{cuisine}</p>
              <p className="restaurant-type-data">{location}</p>

              <div className="rating-and-price-container">
                <div className="ratings-container-data">
                  <div className="ratings-cart-data">
                    <AiFillStar className="icon-color" />
                    <p className="rating-number-data">{rating}</p>
                  </div>
                  <p className="ratings-count-data">{`${reviewsCount} + Ratings`}</p>
                </div>
                <span className="line">|</span>
                <div className="ratings-container-data">
                  <div className="ratings-cart-data">
                    <BiRupee className="icon-color" />
                    <p className="rating-number-data">{costForTwo}</p>
                  </div>
                  <p className="ratings-count-data">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.renderFoodItems()}
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
