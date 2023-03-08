import {Redirect} from 'react-router-dom'

import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', ErrMsg: ''}

  getData = async () => {
    const {username, password} = this.state
    const userDetailes = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetailes),
    }

    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      const JwtToken = data.jwt_token
      Cookies.set('jwt_token', JwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({ErrMsg: data.error_msg})
    }
  }

  changeUserName = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    console.log('hello')
    this.getData()
  }

  render() {
    const {ErrMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-login">
        <img
          src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1678003645/OBJECTS_hpdzbo.jpg"
          className="img-login"
          alt="website login"
        />
        <div className="login-detail-container">
          <img
            src="https://res.cloudinary.com/dufhgcfh6/image/upload/v1678003830/Group_ujrorc.jpg"
            className="logo-in-login"
            alt="website logo"
          />
          <h1 className="title-of-app">Insta Share</h1>
          <form className="form-container" onSubmit={this.submitForm}>
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              className="input"
              id="username"
              placeholder="Enter your name"
              onChange={this.changeUserName}
              value={username}
            />
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              className="input input-two"
              id="password"
              placeholder="Enter your password"
              onChange={this.changePassword}
              value={password}
            />
            <p className="error-msg">{ErrMsg}</p>
            <button type="submit" className="button-of-login">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
