import React from 'react'
import styled from 'styled-components'
import Button from '../general/button'

type OnBoadingViewProps = {
  title?: string
  description?: string
  imageURL?: string
  goToApp: () => void
}

const OnBoadingView = ({ title = '未設定', description, imageURL, goToApp }: OnBoadingViewProps) => {
  return (
    <Root>
      {imageURL ? <AppIcon src={imageURL} /> : <TextAppIcon>{title}</TextAppIcon>}
      <div style={{ height: 24 }} />
      <Name>{title}</Name>
      <div style={{ height: 18 }} />
      <Description>{description}</Description>
      <div style={{ height: 24 }} />
      <Button onClick={goToApp}>アプリへ</Button>
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
`

const AppIcon = styled.img`
  width: 152px;
  height: 152px;
  border-radius: 35px;
  background-color: #ffffff;
  object-fit: cover;
  border: 1px solid #dfe0e5;
`

const TextAppIcon = styled.div`
  width: 152px;
  height: 152px;
  border-radius: 35px;
  background-color: #ffffff;
  border: 1px solid #dfe0e5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  font-size: 24px;
  font-weight: bold;
  color: #2d2e33;
`

const Name = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #2d2e33;
`

const Description = styled.h2`
  font-size: 16px;
  font-weight: normal;
  color: #9da0b2;
`

export default OnBoadingView
