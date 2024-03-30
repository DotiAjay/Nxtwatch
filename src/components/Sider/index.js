import {Component} from 'react'
import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaFireAlt} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import ReactContext from '../../ReactContext'
import './index.css'

class SideBar extends Component {
  render() {
    return (
      <ReactContext.Consumer>
        {value => {
          const {lightTheme} = value

          return (
            <div>
              <ul type="none">
                <Link to="/" className="linkLine">
                  <li className={lightTheme ? 'listLightItem' : 'listDarkItem'}>
                    <IoMdHome className="icons" /> Home
                  </li>
                </Link>
                <Link to="/trending" className="linkLine">
                  <li className={lightTheme ? 'listLightItem' : 'listDarkItem'}>
                    <FaFireAlt className="icons" /> Trending
                  </li>
                </Link>
                <Link to="/gaming" className="linkLine">
                  <li className={lightTheme ? 'listLightItem' : 'listDarkItem'}>
                    <SiYoutubegaming className="icons" /> Gaming
                  </li>
                </Link>
                <Link to="/Saved" className="linkLine">
                  <li className={lightTheme ? 'listLightItem' : 'listDarkItem'}>
                    <SiYoutubegaming className="icons" /> Saved Videos
                  </li>
                </Link>
              </ul>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}
export default SideBar
