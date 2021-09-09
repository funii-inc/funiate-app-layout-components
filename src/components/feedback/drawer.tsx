import React from 'react'
import styled from 'styled-components'

const DRAWER_WIDTH = 240
const DRAWER_Z_INDEX = 1200

const transforms = {
  initialHorizon: 'translateX(0%)',
  top: 'translateY(-100%)',
  right: 'translateX(100%)',
  bottom: 'translateY(100%)',
  left: 'translateX(-100%)',
}

const placements = {
  top: {
    top: 0,
    right: 0,
    left: 0,
  },
  right: {
    top: 0,
    right: 0,
    bottom: 0,
  },
  bottom: {
    right: 0,
    bottom: 0,
    left: 0,
  },
  left: {
    top: 0,
    bottom: 0,
    left: 0,
  },
}

type DrawerProps = {
  open: boolean
  onClose?: React.MouseEventHandler<HTMLDivElement>
  width?: number
  children?: React.ReactNode
}

const Drawer = ({ open, onClose, width = DRAWER_WIDTH, children }: DrawerProps) => {
  return (
    <DrawerWrapper open={open} width={width}>
      <DrawerOverlay open={open} onClick={onClose} />
      <DrawerContent open={open} width={width}>
        {children}
      </DrawerContent>
    </DrawerWrapper>
  )
}

const DrawerWrapper = styled.div<{ width: number; open: boolean }>`
  display: block;
  width: ${(props) => `${props.width}px` ?? '300px'};
  height: '100%';
  z-index: ${DRAWER_Z_INDEX};
`

const DrawerOverlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: ${DRAWER_Z_INDEX + 8};
  display: ${(props) => (props.open ? null : 'none')};
  background-color: rgba(0, 0, 0, 0.5);
`

const DrawerContent = styled.div<{ width: number; open: boolean; backgroundColor?: string }>`
  display: block;
  box-sizing: border-box;
  position: fixed;
  ${placements.left}
  z-index: ${DRAWER_Z_INDEX + 16};
  width: ${(props) => `${props.width}px` ?? '300px'};
  transform: ${(props) => (!props.open ? transforms.left : transforms.initialHorizon)};
  transition: transform 0.2s ease-out;
  overflow-x: hidden;
  overflow-y: scroll;
  color: #2d2e33;
  background-color: ${(props) => props.backgroundColor || '#fff'};
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
`

export default Drawer
