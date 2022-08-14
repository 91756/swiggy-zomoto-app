import {Switch, Route} from 'react-router-dom'
import './App.css'
import Counter from './components/Counter'
import Login from './components/Login'
import Home from './components/Home'
import Footer from './components/Footer'

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
    <Route exact path="/" component={Home} />
  </Switch>
)

export default App
