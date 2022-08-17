import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: 'not get'}

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const user = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showErrorMsg, errorMsg} = this.state
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dy8lqwi3r/image/upload/v1660412399/mobile_img_pryie4.jpg "
          alt=""
          className="mobile-image"
        />
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.onFormSubmit}>
            <img
              src="https://res.cloudinary.com/dy8lqwi3r/image/upload/v1660412417/swiggy_logo_to9j9a.jpg"
              alt="website login"
              className="website-logo"
            />
            <h1 className="heading">Tasty Kitchens</h1>
            <h1 className="login-name">Login</h1>
            <div>
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <br />
              <input
                type="text"
                id="username"
                className="input-text"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div>
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <br />
              <input
                type="password"
                id="password"
                className="input-text"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="custom-button">
              Login
            </button>
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dy8lqwi3r/image/upload/v1660412349/app_image_desktop_s8bpnt.jpg"
          alt="website logo"
          className="login-image"
        />
      </div>
    )
  }
}

export default Login
