import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import './index.css'

class HomeCarousals extends Component {
  state = {
    carousalsList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getCarousalsList()
  }

  getCarousalsList = async () => {
    this.setState({isLoading: true})
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const offersData = data.offers.map(eachData => ({
      id: eachData.id,
      imageUrl: eachData.image_url,
    }))
    this.setState({
      isLoading: false,
      carousalsList: offersData,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurants-offers-loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderCarousalsView = () => {
    const {carousalsList} = this.state
    //  console.log(carousalsList)
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <ul className="container">
        <Slider {...settings} className="carousals-container">
          {carousalsList.map(eachItem => (
            <li key={eachItem.id}>
              <img
                src={eachItem.imageUrl}
                alt="offer"
                className="carousals-image"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoadingView() : this.renderCarousalsView()
  }
}

export default HomeCarousals
