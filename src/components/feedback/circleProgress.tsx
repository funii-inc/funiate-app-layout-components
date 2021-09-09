import React from 'react'
import styled, { keyframes } from 'styled-components'

type CircleProgressSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'

const getCircleProgressSizeHandle = (size: CircleProgressSize) => {
  switch (size) {
    case 'xxs':
      return 3
    case 'xs':
      return 6
    case 's':
      return 8
    case 'm':
      return 10
    case 'l':
      return 16
    case 'xl':
      return 20
    case 'xxl':
      return 40
  }
}

type CircleProgressProps = {
  size?: CircleProgressSize
}

const CircleProgress = ({ size = 'm' }: CircleProgressProps) => <BaseCircleProgress size={getCircleProgressSizeHandle(size)} />

const loading = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const BaseCircleProgress = styled.div<{ size: number }>`
  border-radius: 50%;
  width: 10em;
  height: 10em;
  font-size: ${(props) => props.size}px;
  position: relative;
  text-indent: -9999em;
  border-top: ${(props) => `1.1em solid ${props.theme.system.gray6}`};
  border-right: ${(props) => `1.1em solid ${props.theme.system.gray6}`};
  border-bottom: ${(props) => `1.1em solid ${props.theme.system.gray6}`};
  border-left: 1.1em solid ${(props) => props.theme.tints.primary.main};
  transform: translateZ(0);
  animation: ${loading} 1.1s infinite linear;

  &::after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`

export default CircleProgress
