import {FiMinus, FiPlus} from 'react-icons/fi'
import {BiRupee} from 'react-icons/bi'
import {RiCloseCircleFill} from 'react-icons/ri'

import CartContext from '../../context/CartContext'
import './index.css'

const FoodItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
      } = value

      const {foodItem} = props
      const {imageUrl, name, quantity, cost, id} = foodItem

      const onDecrementQuantity = () => {
        decrementCartItemQuantity(id)
      }

      const onIncrementQuantity = () => {
        incrementCartItemQuantity(id)
      }

      const removingCartItem = () => {
        removeCartItem(id)
      }

      return (
        <li className="cart-food-container" testid="cartItem">
          <div className="cart-image-container cart-for-image-name">
            <img
              src={imageUrl}
              alt="food item"
              className="cart-food-item-image"
            />
            <h1 className="cart-food-name">{name}</h1>
          </div>
          <div className="quantity-counter-container cart-for-element">
            <button
              type="button"
              className="quantity-button"
              testid="decrement-quantity"
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
              testid="increment-quantity"
              onClick={onIncrementQuantity}
            >
              <FiPlus />
            </button>
          </div>
          <div className="cart-for-element">
            <div className="total-price-container">
              <BiRupee color="#FFA412" />
              <p className="price" testid="total-price">
                {` ${cost * quantity}.00`}
              </p>
            </div>
            <button
              type="button"
              className="remove-one-item"
              onClick={removingCartItem}
            >
              <RiCloseCircleFill className="remove-item" />
            </button>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default FoodItem
