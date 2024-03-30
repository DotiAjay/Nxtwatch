import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import SideBar from '../Sider'
import Header from '../Header'
import Contact from '../Contact'
import VideoItem from '../videoItem'
import ReactContext from '../../ReactContext'
import {Banner} from './homeStyled'

import './index.css'

const apiConstant = {
  success: 'SUCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {videosList: [], searchInput: '', apiStatus: apiConstant.loading}

  componentDidMount() {
    this.getVideosDetails()
  }

  searchVideo = event => {
    const val = event.target.value

    this.setState({searchInput: val}, this.getVideosDetails)
  }

  getVideosDetails = async () => {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

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
      this.setState({videosList: updateList, apiStatus: apiConstant.success})
    } else {
      this.setState({apiStatus: apiConstant.failure})
    }
  }

  retry = () => {
    this.getVideosDetails()
  }

  getNotFound = () => (
    <div className='.NotFoundContainer'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png '
        alt='no videos'
        className='NotFoundImg'
      />
      <h1>No Search Results found</h1>
      <p>Try different key words or remove search filter</p>
      <button onClick={this.retry} type='button'>
        Retry
      </button>
    </div>
  )

  renderfailureView = () => (
    <div>
      <img
        src='https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        alt='nxt watch logo'
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble to complete your request.</p>
      <p>Please try again</p>
      <button type='button'>Retry</button>
    </div>
  )

  renderLoading = () => (
    <div data-testid='loader'>
      <Loader type='ThreeDots' />
    </div>
  )

  render() {
    const {videosList, searchInput, apiStatus} = this.state
    console.log(apiStatus)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to='/login' />
    }

    return (
      <ReactContext.Consumer>
        {value => {
          const {lightTheme} = value

          return (
            <div>
              <Header />

              <div className='mainbg'>
                <div className={lightTheme ? 'light' : 'darkTheme'}>
                  <SideBar />
                  <Contact />
                </div>
                <div className='bg'>
                  <Banner data-testid='banner'>
                    <img
                      src='https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      alt='nxt watch logo'
                    />

                    <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                    <button
                      className='getButton'
                      type='button'
                      data-testid='close'
                    >
                      GET IT NOW
                    </button>
                  </Banner>
                  <div
                    className={
                      lightTheme
                        ? 'dispayVideosContainerLight'
                        : 'dispayVideosContainerDark'
                    }
                  >
                    {apiStatus === apiConstant.loading && this.renderLoading()}
                    <div>
                      {apiStatus === apiConstant.success ? (
                        <div>
                          <div>
                            <input
                              type='search'
                              placeholder='search'
                              className='input'
                              onChange={this.searchVideo}
                              value={searchInput}
                            />
                            <button
                              data-testid='searchButton'
                              className='ThemeButton'
                              type='button'
                            >
                              <FaSearch />
                              {/* eslint-disable-next-line */}
                            </button>
                          </div>
                          <div className='NotFoundContainer'>
                            {videosList.length === 0 ? (
                              this.getNotFound()
                            ) : (
                              <ul
                                className={
                                  lightTheme ? 'dispayLight' : 'dispayDark'
                                }
                              >
                                {videosList.map(eachItem => (
                                  <VideoItem
                                    videoDetails={eachItem}
                                    key={eachItem.id}
                                  />
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ) : (
                        this.renderfailureView()
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}

export default Home
