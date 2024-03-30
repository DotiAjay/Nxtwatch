import {formatDistanceToNow} from 'date-fns'
import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import ReactContext from '../../ReactContext'
import {
  Thumnail,
  Title,
  MainVideoContainer,
  Time,
  ParaContainer,
  ListItem,
} from './videoItem'

class VideoItem extends Component {
  render() {
    const {videoDetails} = this.props
    const {
      profileImageUrl,
      thumbnailUrl,
      publishedAt,
      name,
      title,
      viewCount,
      id,
    } = videoDetails

    const year = new Date(publishedAt).getFullYear()
    const month = new Date(publishedAt).getMonth()
    const uplodedAt = formatDistanceToNow(new Date(year, month))
    const num = uplodedAt.indexOf(' ')
    const exactYear = uplodedAt.slice(num, uplodedAt.length)

    return (
      <ReactContext.Consumer>
        {value => {
          const {lightTheme} = value

          return (
            <Link
              to={`videos/${id}`}
              style={{paddingLeft: 13, textDecoration: 'none'}}
            >
              <ListItem>
                <Thumnail
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  type="true"
                />
                <MainVideoContainer>
                  <div>
                    <Thumnail
                      src={profileImageUrl}
                      alt="channel logo"
                      type="false"
                    />
                  </div>
                  <ParaContainer>
                    <Title lightTheme={lightTheme}>{title}</Title>
                    <Title lightTheme={lightTheme}>{name}</Title>
                    <MainVideoContainer>
                      <Time lightTheme={lightTheme}>{viewCount} views </Time>
                      <Time lightTheme={lightTheme}>.</Time>
                      <Time lightTheme={lightTheme}> {exactYear} ago</Time>
                    </MainVideoContainer>
                  </ParaContainer>
                </MainVideoContainer>
              </ListItem>
            </Link>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}
export default withRouter(VideoItem)
