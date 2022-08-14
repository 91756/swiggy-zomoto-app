import React, {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import './index.css'

export default class HomeCarousals extends Component {
  state = {carousalsList: '', apiStatus: false}

  componentDidMount() {
    this.getCarousalsList()
  }

  getCarousalsList = async () => {
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
    this.setState({carousalsList: offersData, apiStatus: true})
  }

  render() {
    const {carousalsList, apiStatus} = this.state
    console.log(carousalsList)
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <div className="container">
        <div className="carousals-container" testid="restaurants-offers-loader">
          {apiStatus && (
            <ul>
              <Slider {...settings}>
                {carousalsList.map(eachItem => (
                  <li key={eachItem.id}>
                    <img
                      src={eachItem.imageUrl}
                      alt="offers"
                      className="carousals-image"
                    />
                  </li>
                ))}
              </Slider>
            </ul>
          )}
        </div>
      </div>
    )
  }
}
