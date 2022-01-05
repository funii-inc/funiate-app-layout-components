import React, { useState } from 'react'
import styled from 'styled-components'
import { IoMdMenu } from 'react-icons/io'
import { ThemeProps } from '@funii-inc/funiate-types'
import IconButton from '../general/iconButton'
import AppBar from '../navigation/appBar'
import SidePanel from '../navigation/sidePanel'
import Drawer from '../feedback/drawer'
import List from '../dataDisplay/list'
import transpiler from '../transpiler'
import defaultTheme from '../defaultTheme'

type MenuItem = {
  id: string
  title: string
  onClick: () => void
}

type TabItem = {
  id: string
  title: string
  onClick: () => void
}

type TabViewProps = {
  menuItems?: MenuItem[]
  activeMenuID?: string
  tabItems?: TabItem[]
  activeTabID?: string
  children?: React.ReactNode
  goBack?: () => void
  screenStyle?: React.CSSProperties
  headerShown?: boolean
  headerTitle?: string
  headerStyle?: React.CSSProperties
  theme?: ThemeProps
}

const TabView = ({
  menuItems = [],
  activeMenuID,
  tabItems = [],
  activeTabID,
  children,
  screenStyle = {},
  headerShown = true,
  headerTitle = '',
  headerStyle = {},
  theme = defaultTheme,
}: TabViewProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <div style={screenStyle}>
      {headerShown && (
        <AppBar style={headerStyle}>
          <AppBar.Left>
            {menuItems.length > 1 && (
              <IconButton style={{ marginLeft: -12 }} onClick={() => setShowMenu((prev) => !prev)}>
                <IoMdMenu size={24} />
              </IconButton>
            )}
          </AppBar.Left>
          <AppBar.Title>{headerTitle}</AppBar.Title>
          <AppBar.Right></AppBar.Right>
        </AppBar>
      )}
      <Row>
        <SidePanel>
          <List>
            {tabItems.map((item) => {
              return (
                <List.Item key={item.id} onClick={item.onClick}>
                  {/* TODO: iconどうするか.... */}
                  {/* <List.ItemIcon style={activeTabID === item.id ? { color: '#2d2e33' } : {}}>
                    <MdBlock size={24} />
                  </List.ItemIcon> */}
                  <List.ItemText
                    active={activeTabID === item.id}
                    color={transpiler.toCssColor(theme.palette.text.secondary.color)}
                    activeColor={transpiler.toCssColor(theme.palette.text.primary.color)}
                  >
                    {item.title}
                  </List.ItemText>
                </List.Item>
              )
            })}
          </List>
        </SidePanel>
        <Content>{children}</Content>
      </Row>
      <Drawer open={showMenu} onClose={() => setShowMenu(false)} bgColor={transpiler.toCssColor(theme.palette.background.paper.color)}>
        <List>
          {menuItems.map((item) => {
            return (
              <List.Item
                key={item.id}
                onClick={() => {
                  item.onClick()
                  setShowMenu(false)
                }}
              >
                <List.ItemText
                  active={activeMenuID === item.id}
                  color={transpiler.toCssColor(theme.palette.text.secondary.color)}
                  activeColor={transpiler.toCssColor(theme.palette.text.primary.color)}
                >
                  {item.title}
                </List.ItemText>
              </List.Item>
            )
          })}
        </List>
      </Drawer>
    </div>
  )
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Content = styled.div`
  flex: 1;
`

export default TabView
