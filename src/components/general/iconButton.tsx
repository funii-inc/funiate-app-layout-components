import styled from 'styled-components'

const IconButton = styled.button<{ color?: string }>`
  padding: 12px;
  border-radius: 50%;
  color: ${({ color = 'inherit' }) => color};
  cursor: pointer;
  border: 0;
  outline: 0;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background-color: transparent;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

export default IconButton
