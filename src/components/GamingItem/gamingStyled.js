import styled from 'styled-components'

export const GameConatainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px
    width : 400px
    height:200px

`

export const ThumnailGameing = styled.img`
  height: 200px;
  width: 200px;
  margin: 5px;
`
export const Time = styled.p`
  color: ${props => (props.lightTheme ? ' #1e293b' : ' #e2e8f0')};
  font-family: 'roboto';
  margin: 10px;
`
