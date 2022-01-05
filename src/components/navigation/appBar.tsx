import React from 'react'
import styled from 'styled-components'

type AppBarProps = {
  style?: React.CSSProperties
  children?: React.ReactNode
}

const AppBar = ({ style, children }: AppBarProps) => (
  <HeaderWrapper>
    <Toolbar style={style}>{children}</Toolbar>
  </HeaderWrapper>
)

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
`

export const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
  padding-left: 24px;
  padding-right: 24px;
`

export const AppBarTitle = styled.h1<{ color?: string }>`
  /* font-size: 0.875rem; */
  color: ${({ color = 'inherit' }) => color};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
`

export const AppBarLeft = styled.div``

export const AppBarRight = styled.div``

AppBar.Title = AppBarTitle
AppBar.Left = AppBarLeft
AppBar.Right = AppBarRight
AppBar.Toolbar = Toolbar

export default AppBar
