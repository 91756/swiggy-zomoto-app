import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import {FiMinus, FiPlus} from 'react-icons/fi'
import './index.css'
import CartContext from '../../context/CartContext'

class FoodItemCard extends Component {
  state = {quantity: 0}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value
          const {quantity} = this.state
          const {foodItemDetails} = this.props
          const {imageUrl, name, cost, rating, id} = foodItemDetails

          const onclickAddItem = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
            addCartItem({...foodItemDetails, quantity: quantity + 1})
          }

          const onDecrementQuantity = () => {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decrementCartItemQuantity(id)
          }

          const onIncrementQuantity = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
            incrementCartItemQuantity(id)
          }

          return (
            <li className="food-item-container" testid="foodItem">
              <img src={imageUrl} alt="food item" className="food-item-image" />
              <div className="food-item-details">
                <h1 className="food-item-name">{name}</h1>
                <div className="cost-container">
                  <BiRupee className="cost-icon" />
                  <p className="food-cost">{`${cost}.00`}</p>
                </div>
                <div className="ratings-container">
                  <AiFillStar className="star-icon" />
                  <p className="food-item-rating">{rating}</p>
                </div>
                {quantity === 0 ? (
                  <button
                    type="button"
                    className="add-button"
                    onClick={onclickAddItem}
                  >
                    ADD
                  </button>
                ) : (
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
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default FoodItemCard
