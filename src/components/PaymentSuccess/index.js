import {Link} from 'react-router-dom'
import {TiTick} from 'react-icons/ti'
import Header from '../Header'
import './index.css'

const PaymentSuccess = () => (
  <div>
    <Header />
    <div className="empty-cart-container">
      <button type="button" className="success-tick">
        <TiTick className="tick-icon" />
      </button>
      <h1 className="empty-cart-heading">Payment Successful</h1>
      <p className="empty-cart-description">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="empty-cart-button">
          Go To Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default PaymentSuccess
