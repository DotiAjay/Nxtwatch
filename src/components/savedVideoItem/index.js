import {Component} from 'react'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ReactContext from '../../ReactContext'
import './index.css'

class SavedVideo extends Component {
  render() {
    const {savedDetails} = this.props
    const {name, thumbnailUrl, publishedAt, viewCount, title, id} = savedDetails
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
              <li>
                <div className="savedConatainer">
                  <div>
                    <img
                      src={thumbnailUrl}
                      alt="video thumbnail"
                      className="profileImg"
                    />
                  </div>
                  <div>
                    <p
                      className={
                        lightTheme ? 'savedTitleLight' : 'savedTitleDark'
                      }
                    >
                      {title}
                    </p>
                    <p
                      className={
                        lightTheme
                          ? 'savedChannelNameLight'
                          : 'savedChannelNameDark'
                      }
                    >
                      {name}
                    </p>
                    <div className="timeCard">
                      <p
                        className={
                          lightTheme
                            ? 'savedChannelNameLight'
                            : 'savedChannelNameDark'
                        }
                      >
                        {viewCount} Views
                      </p>
                      <p
                        className={
                          lightTheme
                            ? 'savedChannelNameLight'
                            : 'savedChannelNameDark'
                        }
                      >
                        {exactYear} ago
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}

export default SavedVideo
