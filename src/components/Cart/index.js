import {Component} from 'react'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import CartContext from '../../context/CartContext'
import EmptyCart from '../EmptyCart'
import CartItem from '../CartItem'
import PaymentSuccess from '../PaymentSuccess'

class Cart extends Component {
  state = {isOrderPlaced: false}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {removeAllCartItems} = value
          /* const showEmptyCartView = cartList.length === 0
          const totalPrice = cartList.map(
            eachItem => eachItem.cost * eachItem.quantity,
          ) */
          const {isOrderPlaced} = this.state
          console.log(isOrderPlaced)
          const getCartDataFromLocalStorage = localStorage.getItem('cartData')
          const parsedCartData = JSON.parse(getCartDataFromLocalStorage)
          const cartList = parsedCartData

          const showEmptyCartView = cartList.length === 0
          const totalPrice = cartList.map(
            eachItem => eachItem.cost * eachItem.quantity,
          )

          let total = null
          if (cartList.length > 0) {
            total = totalPrice.reduce((acc, price) => acc + price)
          }

          const onChangePlaceOrder = () => {
            this.setState(prevState => ({
              isOrderPlaced: !prevState.isOrderPlaced,
            }))
          }

          return (
            <div>
              <Header />
              {showEmptyCartView ? (
                <EmptyCart />
              ) : (
                <>
                  {isOrderPlaced ? (
                    <PaymentSuccess />
                  ) : (
                    <div className="cart-container">
                      <ul className="cart-list-container">
                        <button
                          className="remove-all-cart-items"
                          type="button"
                          onClick={removeAllCartItems}
                        >
                          Remove All
                        </button>
                        <div className="food-list-names">
                          <p className="food-name">Item</p>
                          <p className="food-name">Quantity</p>
                          <p className="food-name">Price</p>
                        </div>
                        {cartList.map(eachFoodItem => (
                          <CartItem
                            foodItem={eachFoodItem}
                            key={eachFoodItem.id}
                            testid="cartItem"
                          />
                        ))}
                        <hr className="cart-horizontal-line" />
                        <div className="cart-total-price-container">
                          <h1 className="order-total">Order Total: </h1>
                          <p className="order-total" testid="total-price">
                            &#8377; {total}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="place-order-button"
                          onClick={onChangePlaceOrder}
                        >
                          Place Order
                        </button>
                      </ul>
                    </div>
                  )}
                </>
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
