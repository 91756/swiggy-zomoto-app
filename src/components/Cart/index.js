import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
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
          const totalPrice = cartList.map(
            eachItem => eachItem.cost * eachItem.quantity,
          )

          let total = null
          if (cartList.length > 0) {
            total = totalPrice.reduce((acc, price) => acc + price)
          }

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
                    <hr className="cart-horizontal-line" />
                    <div className="cart-total-price-container">
                      <p className="order-total">Order Total : </p>
                      <p className="order-total">&#8377; {total}</p>
                    </div>
                    <button type="button" className="place-order-button">
                      Place Order
                    </button>
                  </ul>
                </div>
              )}
              <Footer />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
