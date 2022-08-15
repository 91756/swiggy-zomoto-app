import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Counter from './components/Counter'
import Login from './components/Login'
import Home from './components/Home'
import Footer from './components/Footer'
import Cart from './components/Cart'
import PageNotFound from './components/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantDetails from './components/RestaurantDetails'

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

const App = () => (
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
)

export default App
