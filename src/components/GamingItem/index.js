import {Component} from 'react'
import {Link} from 'react-router-dom'
import ReactContext from '../../ReactContext'
import {GameConatainer, ThumnailGameing, Time} from './gamingStyled'

class GamingItem extends Component {
  render() {
    const {GamingvideoDetails} = this.props
    const {thumbnailUrl, id, title, viewCount} = GamingvideoDetails

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
                <GameConatainer>
                  <div>
                    <ThumnailGameing src={thumbnailUrl} />
                  </div>
                  <div>
                    <Time lightTheme={lightTheme}>{title}</Time>
                    <Time lightTheme={lightTheme}>{viewCount}</Time>
                  </div>
                </GameConatainer>
              </li>
            </Link>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}
export default GamingItem
