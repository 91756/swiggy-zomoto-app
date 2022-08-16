import {FiMinus, FiPlus} from 'react-icons/fi'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'
import './index.css'

const FoodItem = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value

      const {foodItem} = props
      const {imageUrl, name, quantity, cost, rating, id} = foodItem

      const onDecrementQuantity = () => {
        decrementCartItemQuantity(id)
      }

      const onIncrementQuantity = () => {
        incrementCartItemQuantity(id)
      }

      return (
        <li className="food-list-names">
          <div className="cart-image-container">
            <img
              src={imageUrl}
              alt="food item"
              className="cart-food-item-image"
            />
            <h1 className="cart-food-name">{name}</h1>
          </div>
          <div className="quantity-counter-container">
            <button
              type="button"
              className="quantity-button"
              testid="decrement-count"
              onClick={onDecrementQuantity}
            >
              <FiMinus />
            </button>
            <p className="total-quantity" testid="active-count">
              {quantity}
            </p>
            <button
              type="button"
              className="quantity-button"
              testid="increment-count"
              onClick={onIncrementQuantity}
            >
              <FiPlus />
            </button>
          </div>
          <div className="total-price-container">
            <BiRupee color="#FFA412" />
            <p className="price">{` ${cost * quantity}.00`} </p>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default FoodItem
