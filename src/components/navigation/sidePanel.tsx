import React from 'react'
import styled from 'styled-components'

const SIDE_PANEL_WIDTH = 240

type SidePanelProps = {
  style?: React.CSSProperties
  children?: React.ReactNode
}

const SidePanel = ({ style, children }: SidePanelProps) => {
  return (
    <Nav style={style}>
      <Root>{children}</Root>
    </Nav>
  )
}

const Nav = styled.nav`
  width: ${SIDE_PANEL_WIDTH}px;
`

const Root = styled.div`
  position: fixed;
  width: ${SIDE_PANEL_WIDTH}px;
  height: 100%;
  background-color: #ffffff;
  border-right: 1px solid #dfe0e5;
  z-index: 1000;
`

export default SidePanel
