import {Component} from 'react'
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="logo-heading-container">
        <img
          src="https://res.cloudinary.com/dy8lqwi3r/image/upload/v1660412390/logo_icon_r7bbjq.png"
          alt="website-footer-logo"
          className="website-footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="description">
        The only thing we are serious about is food. Contact us on
      </p>
      <div>
        <FaPinterestSquare
          className="icon-color"
          testid="pintrest-social-icon"
        />
        <FaInstagram className="icon-color" testid="instagram-social-icon" />
        <FaTwitter className="icon-color" testid="twitter-social-icon" />
        <FaFacebookSquare
          className="icon-color"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
