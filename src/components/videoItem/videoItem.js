import styled from 'styled-components'

export const MainVideoContainer = styled.div`
  display: flex;
  flex-direction: row;
`
export const Thumnail = styled.img`
  height: ${props => (props.type === 'true' ? '200px' : '40px')};
  width: ${props => (props.type === 'true' ? '300px' : '40px')};
  margin: ${props => (props.type === 'true' ? '5px' : '10px')};
`
export const Title = styled.p`
  color: ${props => (props.lightTheme ? ' #475569' : ' #e2e8f0')};
  font-family: 'roboto';
  font-weight: bold;
  margin: 5px;
`
export const Time = styled.p`
  color: ${props => (props.lightTheme ? ' #1e293b' : ' #e2e8f0')};
  font-family: 'roboto';
  margin: 10px;
`
export const ParaContainer = styled.div`
  width: 270px;
  display: flex;
  flex-direction: column;
`
export const ListItem = styled.li`
  margin-bottom: 10px;
`
