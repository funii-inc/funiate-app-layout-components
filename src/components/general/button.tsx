import styled from 'styled-components'

const Button = styled.button<{ bgColor: string; color?: string }>`
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: normal;
  color: ${({ color = 'inherit' }) => color};
  background-color: ${({ bgColor }) => bgColor};
  border: none;
  cursor: pointer;
`

export default Button
