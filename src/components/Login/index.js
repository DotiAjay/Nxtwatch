import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  LoginCard,
  UserLabel,
  UserInput,
  LoginButton,
  LoginMain,
  LogoImg,
  Para,
} from './LoginStyled'

class Login extends Component {
  state = {
    isShowPass: false,
    userValue: '',
    passwordValue: '',
    errorMsg: '',
  }

  changeUserInput = event => {
    this.setState({userValue: event.target.value})
  }

  changeUserPass = event => {
    this.setState({passwordValue: event.target.value})
  }

  showPassword = () => {
    this.setState(preState => ({
      isShowPass: !preState.isShowPass,
    }))
  }

  formSubmit = async event => {
    const {userValue, passwordValue} = this.state
    const {history} = this.props
    const userDetails = {username: userValue, password: passwordValue}
    event.preventDefault()

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const Response = await fetch(url, options)
    const data = await Response.json()
    const jwtToken = data.jwt_token
    if (Response.ok === true) {
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {userValue, passwordValue, errorMsg, isShowPass} = this.state
    const val = isShowPass ? 'text' : 'Password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <LoginMain theme="#ffffff">
        <LoginCard theme="#e2e8f0">
          <div>
            <LogoImg src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" />
          </div>
          <form onSubmit={this.formSubmit}>
            <UserLabel htmlFor="username" theme=" #f8fafc">
              USERNAME
            </UserLabel>{' '}
            <br />
            <UserInput
              typr="text"
              placeholder="Username"
              id="username"
              onChange={this.changeUserInput}
              value={userValue}
            />{' '}
            <br />
            <UserLabel htmlFor="password" theme=" #f8fafc">
              Password
            </UserLabel>{' '}
            <br />
            <UserInput
              type={val}
              placeholder="Password"
              id="password"
              onChange={this.changeUserPass}
              value={passwordValue}
            />{' '}
            <br />
            <input
              type="checkbox"
              htmlFor="showPass"
              onClick={this.showPassword}
            />
            <UserLabel theme=" #f8fafc">Show Password</UserLabel>
            <LoginButton type="submit">Login</LoginButton>
            <Para>{errorMsg}</Para>
          </form>
        </LoginCard>
      </LoginMain>
    )
  }
}

export default Login
