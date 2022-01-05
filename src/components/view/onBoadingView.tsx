import React from 'react'
import styled from 'styled-components'
import { ThemeProps } from '@funii-inc/funiate-types'
import Button from '../general/button'
import transpiler from '../transpiler'
import defaultTheme from '../defaultTheme'

type OnBoadingViewProps = {
  title?: string
  description?: string
  imageURL?: string
  theme?: ThemeProps
  goToApp: () => void
}

const OnBoadingView = ({ title = '未設定', description, imageURL, theme = defaultTheme, goToApp }: OnBoadingViewProps) => {
  return (
    <Root bgColor={transpiler.toCssColor(theme.palette.background.default.color)}>
      {imageURL ? (
        <AppIcon
          src={imageURL}
          borderColor={transpiler.toCssColor(theme.palette.divider.color)}
          bgColor={transpiler.toCssColor(theme.palette.background.default.color)}
        />
      ) : (
        <TextAppIcon
          borderColor={transpiler.toCssColor(theme.palette.divider.color)}
          bgColor={transpiler.toCssColor(theme.palette.background.default.color)}
          color={transpiler.toCssColor(theme.palette.text.primary.color)}
        >
          {title}
        </TextAppIcon>
      )}
      <div style={{ height: 24 }} />
      <Name color={transpiler.toCssColor(theme.palette.text.primary.color)}>{title}</Name>
      <div style={{ height: 18 }} />
      <Description color={transpiler.toCssColor(theme.palette.text.secondary.color)}>{description}</Description>
      <div style={{ height: 24 }} />
      <Button
        bgColor={transpiler.toCssColor(theme.palette.primary.main.color)}
        color={transpiler.toCssColor(theme.palette.primary.contrastText.color)}
        onClick={goToApp}
      >
        アプリへ
      </Button>
    </Root>
  )
}

const Root = styled.div<{ bgColor: string }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
`

const AppIcon = styled.img<{ borderColor: string; bgColor: string }>`
  width: 152px;
  height: 152px;
  border-radius: 35px;
  background-color: ${({ bgColor }) => bgColor};
  object-fit: cover;
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
`

const TextAppIcon = styled.div<{ borderColor: string; bgColor: string; color: string }>`
  width: 152px;
  height: 152px;
  border-radius: 35px;
  background-color: ${({ bgColor }) => bgColor};
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  font-size: 24px;
  font-weight: bold;
  color: ${({ color }) => color};
`

const Name = styled.h1<{ color: string }>`
  font-size: 24px;
  font-weight: bold;
  color: ${({ color }) => color};
`

const Description = styled.h2<{ color: string }>`
  font-size: 16px;
  font-weight: normal;
  color: ${({ color }) => color};
`

export default OnBoadingView
