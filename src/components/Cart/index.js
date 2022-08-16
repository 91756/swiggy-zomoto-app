import {Component} from 'react'
import {FiMinus, FiPlus} from 'react-icons/fi'
import './index.css'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import EmptyCart from '../EmptyCart'
import CartItem from '../CartItem'

class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const showEmptyCartView = cartList.length === 0

          return (
            <div>
              <Header />
              {showEmptyCartView && <EmptyCart />}
              {!showEmptyCartView && (
                <div className="cart-container">
                  <ul className="cart-list-container">
                    <div className="food-list-names">
                      <p className="food-name">Item</p>
                      <p className="food-name">Quantity</p>
                      <p className="food-name">Price</p>
                    </div>
                    {cartList.map(eachFoodItem => (
                      <CartItem foodItem={eachFoodItem} key={eachFoodItem.id} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
