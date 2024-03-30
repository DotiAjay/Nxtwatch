import {Component} from 'react'
import Cookies from 'js-cookie'
import SideBar from '../Sider'
import Header from '../Header'
import Contact from '../Contact'
import GamingItem from '../GamingItem'
import ReactContext from '../../ReactContext'
import './index.css'

class Gaming extends Component {
  state = {gamingList: [], gamingStatus: ''}

  componentDidMount() {
    this.getGameDetails()
  }

  getGameDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/videos/gaming'

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updateList = data.videos.map(each => ({
        thumbnailUrl: each.thumbnail_url,
        id: each.id,
        title: each.title,
        viewCount: each.view_count,
      }))

      this.setState({gamingList: updateList, gamingStatus: 'success'})
    } else {
      this.setState({gamingStatus: 'fail'})
    }
  }

  retry = () => {
    this.getVideosDetails()
  }

  renderfailureView = () => (
    <div className="failureCard">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="failureImg"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble to complete your request.</p>
      <p>Please try again</p>
      <button onClick={this.retry} type="button">
        Retry
      </button>
    </div>
  )

  render() {
    const {gamingList, gamingStatus} = this.state
    return (
      <ReactContext.Consumer>
        {value => {
          const {lightTheme} = value
          return (
            <div>
              <Header />

              <div className="mainbg">
                <div className={lightTheme ? 'light' : 'darkTheme'}>
                  <SideBar />
                  <Contact />
                </div>
                <div>
                  {gamingStatus === 'success' ? (
                    <ul
                      className={
                        lightTheme
                          ? 'dispayVideosContainerLight'
                          : 'dispayVideosContainerDark'
                      }
                    >
                      {gamingList.map(eachItem => (
                        <GamingItem
                          GamingvideoDetails={eachItem}
                          key={eachItem.id}
                        />
                      ))}
                    </ul>
                  ) : (
                    this.renderfailureView()
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}
export default Gaming
