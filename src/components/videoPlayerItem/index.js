import {Component} from 'react'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {BiDislike, BiLike, BiListPlus} from 'react-icons/bi'
import SideBar from '../Sider'
import Header from '../Header'
import Contact from '../Contact'
import ReactContext from '../../ReactContext'
import './index.css'

class VideoDetails extends Component {
  state = {videoDetails: [], like: ''}

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/videos/${id}`

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const updateVideoDetails = {
      name: data.video_details.channel.name,
      subscriberCount: data.video_details.channel.subscriber_count,
      profileImageUrl: data.video_details.channel.profile_image_url,
      id: data.video_details.id,
      publishedAt: data.video_details.published_at,
      thumbnailUrl: data.video_details.thumbnail_url,
      title: data.video_details.title,
      viewCount: data.video_details.view_count,
      description: data.video_details.description,
      videoUrl: data.video_details.video_url,
    }
    const year = new Date(updateVideoDetails.publishedAt).getFullYear()
    const month = new Date(updateVideoDetails.publishedAt).getMonth()
    const uplodedAt = formatDistanceToNow(new Date(year, month))
    const num = uplodedAt.indexOf(' ')
    const exactYear = uplodedAt.slice(num, uplodedAt.length)

    this.setState({videoDetails: updateVideoDetails, years: exactYear})
  }

  LikeButton = () => {
    this.setState({like: 'yes'})
  }

  DislikeButton = () => {
    this.setState({like: 'no'})
  }

  render() {
    const {videoDetails, years, like} = this.state
    const {
      name,
      profileImageUrl,
      title,
      viewCount,
      description,
      videoUrl,
      subscriberCount,
    } = videoDetails

    return (
      <ReactContext.Consumer>
        {value => {
          const {lightTheme, addVideoTosave} = value
          const onSave = () => {
            addVideoTosave(videoDetails)
          }
          return (
            <div>
              <Header />
              <div className="mainbg">
                <div className={lightTheme ? 'light' : 'darkTheme'}>
                  <SideBar />
                  <Contact />
                </div>

                <div
                  className={
                    lightTheme ? 'videoDisplayCardLight' : 'videoDisplayDark'
                  }
                >
                  <ReactPlayer url={videoUrl} width="1000px" height="400px" />
                  <p className={lightTheme ? 'titleLight' : 'titleDark'}>
                    {name}
                  </p>
                  <div className="buttonsCard">
                    <div className="timeCard">
                      <p className={lightTheme ? 'timePara' : 'timeParaDark'}>
                        {viewCount} views
                      </p>
                      <p className={lightTheme ? 'timePara' : 'timeParaDark'}>
                        {years} ago
                      </p>
                    </div>
                    <div>
                      <button
                        className="likebutton"
                        onClick={this.LikeButton}
                        type="button"
                      >
                        <span className={like === 'yes' ? 'Liked' : ''}>
                          <BiLike /> Like
                        </span>
                      </button>
                      <button
                        className="likebutton"
                        onClick={this.DislikeButton}
                        type="button"
                      >
                        <span className={like === 'no' ? 'Liked' : ''}>
                          {' '}
                          <BiDislike /> Dislike
                        </span>
                      </button>
                      <button
                        className="likebutton"
                        onClick={onSave}
                        type="button"
                      >
                        <BiListPlus /> Save
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="bottomCard">
                    <img
                      src={profileImageUrl}
                      alt="channel logo"
                      className="profileImg"
                    />
                    <div>
                      <p className={lightTheme ? 'timePara' : 'timeParaDark'}>
                        {title}
                      </p>
                      <p className={lightTheme ? 'timePara' : 'timeParaDark'}>
                        {subscriberCount} subscibers
                      </p>
                      <p className={lightTheme ? 'timePara' : 'timeParaDark'}>
                        {description}
                      </p>
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
export default VideoDetails
