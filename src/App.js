import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import './App.css'
import Counter from './components/Counter'
import Login from './components/Login'
import Home from './components/Home'
import Footer from './components/Footer'
import Cart from './components/Cart'
import PageNotFound from './components/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantDetails from './components/RestaurantDetails'
import CartContext from './context/CartContext'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class App extends Component {
  state = {cartList: []}

  // remove cart Item

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(
      eachFoodItem => eachFoodItem.id !== id,
    )
    this.setState({cartList: filteredCartList})
  }

  // add cartItem
  addCartItem = foodItem => {
    // this.setState(prevState => ({cartList: [...prevState.cartList, foodItem]}))
    const {cartList} = this.state
    const foodObject = cartList.find(
      eachFoodItem => eachFoodItem.id === foodItem.id,
    )
    if (foodObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachFoodItem => {
          if (foodObject.id === eachFoodItem.id) {
            const updatedQuantity = foodObject.quantity + eachFoodItem.quantity
            return {...eachFoodItem, quantity: updatedQuantity}
          }
          return eachFoodItem
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, foodItem],
      }))
    }
  }

  // increment quantity
  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachFoodItem => {
        if (id === eachFoodItem.id) {
          const updatedQuantity = eachFoodItem.quantity + 1
          return {...eachFoodItem, quantity: updatedQuantity}
        }
        return eachFoodItem
      }),
    }))
  }

  // decrement quantity

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const foodObject = cartList.find(eachFoodItem => eachFoodItem.id === id)
    if (foodObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachFoodItem => {
          if (eachFoodItem.id === id) {
            const updatedQuantity = eachFoodItem.quantity - 1
            return {...eachFoodItem, quantity: updatedQuantity}
          }
          return eachFoodItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  // remove all cart items

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={PageNotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
