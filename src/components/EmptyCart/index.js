import {Link} from 'react-router-dom'
import './index.css'

const EmptyCart = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/dy8lqwi3r/image/upload/v1660647116/cooking_1_xumgza.png"
      alt="empty cart"
      className="empty-cart-image"
    />
    <h1 className="empty-cart-heading">No Orders Yet!</h1>
    <p className="empty-cart-description">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button type="button" className="empty-cart-button">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCart
