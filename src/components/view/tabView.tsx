import React, { useState } from 'react'
import styled from 'styled-components'
import { IoMdMenu } from 'react-icons/io'
import { MdBlock } from 'react-icons/md'
import IconButton from '../general/iconButton'
import AppBar from '../navigation/appBar'
import SidePanel from '../navigation/sidePanel'
import Drawer from '../feedback/drawer'
import List from '../dataDisplay/list'

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
                  <List.ItemIcon style={activeTabID === item.id ? { color: '#2d2e33' } : {}}>
                    {/* TODO: iconどうするか.... */}
                    <MdBlock size={24} />
                  </List.ItemIcon>
                  <List.ItemText style={activeTabID === item.id ? { fontWeight: 'bold', color: '#2d2e33' } : {}}>{item.title}</List.ItemText>
                </List.Item>
              )
            })}
          </List>
        </SidePanel>
        <Content>{children}</Content>
      </Row>
      <Drawer open={showMenu} onClose={() => setShowMenu(false)}>
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
                <List.ItemText style={activeMenuID === item.id ? { fontWeight: 'bold', color: '#2d2e33' } : {}}>{item.title}</List.ItemText>
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
