import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Counter from './components/Counter'
import Login from './components/Login'
import Home from './components/Home'
import Footer from './components/Footer'
import PageNotFound from './components/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'

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
    <Route path="/not-found" component={PageNotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
