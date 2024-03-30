import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import {FaMoon, FaRegLightbulb} from 'react-icons/fa'
import Popup from 'reactjs-popup'
import ReactContext from '../../ReactContext'
import './index.css'

class Header extends Component {
  logout = () => {
    console.log('logout')
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <ReactContext.Consumer>
        {value => {
          const {lightTheme, changeTheme} = value
          const Theme = () => {
            changeTheme()
          }
          return (
            <div
              className={
                lightTheme ? 'headerContainerLight' : 'headerContainerDark'
              }
            >
              {lightTheme ? (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  className="logo"
                  alt="website logo"
                />
              ) : (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  className="logo"
                  alt="website logo"
                />
              )}

              <div className="buttonsContainer">
                {lightTheme ? (
                  <button
                    type="button"
                    className="ThemeButton"
                    data-testid="theme"
                    onClick={Theme}
                  >
                    <FaMoon className="themeLightButton" />
                    {/* eslint-disable-next-line */}
                  </button>
                ) : (
                  <button
                    className="ThemeButton"
                    data-testid="theme"
                    onClick={Theme}
                    type="button"
                  >
                    <FaRegLightbulb className="themeDarkButton" />
                    {/* eslint-disable-next-line */}
                  </button>
                )}
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile"
                />
                <Popup
                  modal
                  trigger={
                    <button
                      type="button"
                      className={lightTheme ? 'logoutLight' : 'logoutDark'}
                    >
                      Logout
                    </button>
                  }
                  Positon="Bottom center"
                >
                  {close => (
                    <div className="popCard">
                      <button
                        type="button"
                        className="popButton"
                        data-testid="close"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        className="popButton"
                        onClick={this.logout}
                        type="button"
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}
export default withRouter(Header)
