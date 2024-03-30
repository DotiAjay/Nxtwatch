import styled from 'styled-components'

export const LoginMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${props => props.theme};
`

export const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 230px;
  height: 50%;
  width: 300px;
  background-color: ${props => props.theme};
  padding: 30px;
`
export const UserLabel = styled.label`
  font-family: 'Roboto';
  color: #f8fafc;
`
export const UserInput = styled.input`
  height: 40px;
  width: 100%;
  border-radius: 2px;
  border: 2px solid #f1f5f9;
`
export const LoginButton = styled.button`
  height: 50px;
  width: 80%;
  background-color: #4f46e5;
  color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  border: none;
`
export const LogoImg = styled.img`
  height: 50px;
  width: 200px
  padding: 10px;

`
export const Para = styled.p`
  color: #ff0000;
  font-family: 'Roboto';
`
