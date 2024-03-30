import ReactContext from '../../ReactContext'
import './index.css'

const Contact = () => (
  <ReactContext.Consumer>
    {value => {
      const {lightTheme} = value
      return (
        <div>
          <p className={lightTheme ? 'headingLight' : 'headingDark'}>
            CONTACT US
          </p>
          <div className="contactImgContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
              className="contactImg"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
              className="contactImg"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
              className="contactImg"
            />
          </div>
          <p className={lightTheme ? 'headingLight' : 'headingDark'}>
            Enjoy! Now to see your channels and recommendations!
          </p>
        </div>
      )
    }}
  </ReactContext.Consumer>
)

export default Contact
