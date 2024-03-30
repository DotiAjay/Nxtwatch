import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SideBar from '../Sider'
import Header from '../Header'
import Contact from '../Contact'
import VideoItem from '../videoItem'
import ReactContext from '../../ReactContext'
import './index.css'

const apiConstant = {
  success: 'SUCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {TrendingList: [], apiTrendingStatus: apiConstant.loading}

  componentDidMount() {
    this.getVideosDetails()
  }

  getVideosDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/videos/trending'

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updateList = data.videos.map(each => ({
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({
        TrendingList: updateList,
        apiTrendingStatus: apiConstant.success,
      })
    } else {
      this.setState({apiTrendingStatus: apiConstant.failure})
    }
  }

  retry = () => {
    this.getVideosDetails()
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" />
    </div>
  )

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
    const {TrendingList, apiTrendingStatus} = this.state
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
                {apiTrendingStatus === apiConstant.loading &&
                  this.renderLoading()}
                {apiTrendingStatus === apiConstant.success ? (
                  <div>
                    <h1>Trending</h1>
                    <ul
                      className={
                        lightTheme
                          ? 'dispayVideosContainerLight'
                          : 'dispayVideosContainerDark'
                      }
                    >
                      {TrendingList.map(eachItem => (
                        <VideoItem videoDetails={eachItem} key={eachItem.id} />
                      ))}
                    </ul>
                  </div>
                ) : (
                  this.renderfailureView()
                )}
              </div>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}
export default Trending
