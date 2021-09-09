import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import IconButton from '../general/iconButton'
import AppBar from '../navigation/appBar'

type ScreenViewProps = {
  children?: React.ReactNode
  goBack?: () => void
  screenStyle?: React.CSSProperties
  headerShown?: boolean
  headerTitle?: string
  headerStyle?: React.CSSProperties
}

const ScreenView = ({ children, goBack, screenStyle = {}, headerShown = true, headerTitle = '', headerStyle = {} }: ScreenViewProps) => {
  return (
    <div style={screenStyle}>
      {headerShown && (
        <AppBar style={headerStyle}>
          <AppBar.Left>
            {goBack && (
              <IconButton style={{ marginLeft: -12 }} onClick={goBack}>
                <IoIosArrowBack size={24} />
              </IconButton>
            )}
          </AppBar.Left>
          <AppBar.Title>{headerTitle}</AppBar.Title>
          <AppBar.Right></AppBar.Right>
        </AppBar>
      )}
      {children}
    </div>
  )
}

export default ScreenView
