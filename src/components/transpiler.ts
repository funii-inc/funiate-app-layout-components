import React from 'react'
import { Property } from 'csstype'
import {
  AlignHorizontal,
  AlignVertical,
  ThemeProps,
  AxisAlign,
  AxisDistribute,
  Color,
  SizingMode,
  SolidPaint,
  Paint,
  PlainTextStyle,
  TextStyle,
  ThemeTextStyle,
} from '@funii-inc/funiate-types'
import _defaultTheme from './defaultTheme'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isThemeTextStyle = (arg: any): arg is ThemeTextStyle => {
  return arg.keys !== undefined
}

class ReactStyleTranspiler {
  constructor(pxUnit = 10, defaultTheme = _defaultTheme) {
    this.pxUnit = pxUnit
    this.defaultTheme = defaultTheme
  }

  pxUnit: number
  defaultTheme: ThemeProps

  private isHex = (value: string) => {
    return value.charAt(0) === '#'
  }

  private isRgba = (value: string) => {
    const reg = /^rgba?\(.*\)$/
    return reg.test(value)
  }

  private hexToColor = (hex: string, a?: number) => {
    const nakedHex = hex.charAt(0) === '#' ? hex.slice(1) : hex
    const isShort = nakedHex.length === 3 || nakedHex.length === 4

    const twoDigitHexR = isShort ? `${nakedHex.slice(0, 1)}${nakedHex.slice(0, 1)}` : nakedHex.slice(0, 2)
    const twoDigitHexG = isShort ? `${nakedHex.slice(1, 2)}${nakedHex.slice(1, 2)}` : nakedHex.slice(2, 4)
    const twoDigitHexB = isShort ? `${nakedHex.slice(2, 3)}${nakedHex.slice(2, 3)}` : nakedHex.slice(4, 6)
    const twoDigitHexA = (isShort ? `${nakedHex.slice(3, 4)}${nakedHex.slice(3, 4)}` : nakedHex.slice(6, 8)) || 'ff'

    const decimalObject = {
      r: parseInt(twoDigitHexR, 16),
      g: parseInt(twoDigitHexG, 16),
      b: parseInt(twoDigitHexB, 16),
      a: +(parseInt(twoDigitHexA, 16) / 255).toFixed(2),
    }

    const _a: number = a && isFinite(a) ? a : decimalObject.a

    return { ...decimalObject, a: _a }
  }

  private rgbaToColor = (rgba: string, a?: number) => {
    const regExp = /^rgba?\( *([+-]?\d*\.?\d+) *, *([+-]?\d*\.?\d+) *, *([+-]?\d*\.?\d+)(?: *, *([+-]?\d*\.?\d+) *)?\)$/
    const result = regExp.exec(rgba)
    if (!result) {
      throw Error('invalid input rgba value.')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, resultR, resultG, resultB, resultA] = result

    const decimalObject = {
      r: parseInt(resultR),
      g: parseInt(resultG),
      b: parseInt(resultB),
      a: resultA === undefined ? 1 : parseFloat(resultA),
    }

    const _a = a && isFinite(a) ? a : decimalObject.a

    if (isNaN(decimalObject.a) || isNaN(decimalObject.g) || isNaN(decimalObject.b) || isNaN(_a)) {
      throw Error('invalid input rgba value.')
    }

    return { ...decimalObject, a: _a }
  }

  toCalcPaint = (paint: Paint, theme = this.defaultTheme) => {
    if (paint.type === 'SOLID') {
      return paint
    }

    const plainPaint = paint.keys.reduce((prev, crt) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      return prev![crt as keyof typeof prev] as any
    }, theme['palette'])

    return plainPaint as unknown as SolidPaint
  }

  toCalcTextStyle = (textStyle: TextStyle, theme = this.defaultTheme) => {
    if (!isThemeTextStyle(textStyle)) {
      const calcTextStyle: PlainTextStyle = {
        ...textStyle,
        fills: textStyle.fills.map((fill) => this.toCalcPaint(fill, theme)),
      }
      return calcTextStyle
    }

    const plainTextStyle = textStyle.keys.reduce((prev, crt) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      return prev![crt as keyof typeof prev] as any
    }, theme['text'])

    const calcTextStyle: PlainTextStyle = {
      ...(plainTextStyle as unknown as PlainTextStyle),
      fills: (plainTextStyle as unknown as PlainTextStyle).fills.map((fill) => this.toCalcPaint(fill, theme)),
    }

    return calcTextStyle
  }

  toCssColor = (color: Color): Property.Color => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  }

  toColor = (colorCode: string, a?: number) => {
    if (this.isHex(colorCode)) {
      return this.hexToColor(colorCode, a)
    }

    if (this.isRgba(colorCode)) {
      return this.rgbaToColor(colorCode, a)
    }

    throw Error('invalid input color-code.')
  }

  toCssPadding = (padding: number[]): Property.Padding => {
    let cssPadding = ''
    padding.forEach((num, index) => {
      if (index === padding.length - 1) {
        cssPadding += `${num / this.pxUnit}rem`
        return
      }
      cssPadding += `${num / this.pxUnit}rem `
    })
    return cssPadding
  }

  toCssBorderRadius = (cornerRadius: number[]): Property.BorderRadius => {
    let borderRadius = ''
    cornerRadius.forEach((num, index) => {
      if (index === cornerRadius.length - 1) {
        borderRadius += `${num / this.pxUnit}rem`
        return
      }
      borderRadius += `${num / this.pxUnit}rem `
    })
    return borderRadius
  }

  toCssHeight = (height: number | null, sizingMode: SizingMode, py?: number) => {
    let cssHeight: Property.Height = 'auto'
    if (sizingMode === 'FIXED' && height) {
      cssHeight = `${(height + (py ?? 0)) / this.pxUnit}rem`
    }
    if (sizingMode === 'STRETCH') {
      cssHeight = `100%`
    }
    return cssHeight
  }

  toCssWidth = (width: number | null, sizingMode: SizingMode, px?: number) => {
    let cssWidth: Property.Width = 'auto'
    if (sizingMode === 'FIXED' && width) {
      cssWidth = `${(width + (px ?? 0)) / this.pxUnit}rem`
    }
    if (sizingMode === 'STRETCH') {
      cssWidth = `100%`
    }
    return cssWidth
  }

  toCssBorder = (stroke: Paint | null, strokeWeight: number, theme = this.defaultTheme): Property.Border => {
    if (!stroke || strokeWeight === 0) {
      return 'none'
    }
    const plainStroke = this.toCalcPaint(stroke, theme)
    const borderColor = this.toCssColor(plainStroke.color)
    const border = `${strokeWeight / this.pxUnit}rem solid ${borderColor}`
    return border
  }

  toCssTextAlign = (alignHorizontal: AlignHorizontal): Property.TextAlign => {
    let textAlign: Property.TextAlign = 'left'
    if (alignHorizontal === 'CENTER') {
      textAlign = 'center'
    }
    if (alignHorizontal === 'RIGHT') {
      textAlign = 'right'
    }
    return textAlign
  }

  toCssVerticalAlign = (alignVertical: AlignVertical): Property.VerticalAlign => {
    let verticalAlign: Property.VerticalAlign = 'top'
    if (alignVertical === 'CENTER') {
      verticalAlign = ' middle'
    }
    if (alignVertical === 'BOTTOM') {
      verticalAlign = 'bottom'
    }
    return verticalAlign
  }

  toCssJustifyContent = (alignHorizontal: AlignHorizontal | AxisAlign): Property.JustifyContent => {
    let justifyContent: Property.JustifyContent = 'flex-start'
    if (alignHorizontal === 'CENTER') {
      justifyContent = 'center'
    }
    if (alignHorizontal === 'RIGHT' || alignHorizontal === 'END') {
      justifyContent = 'flex-end'
    }
    return justifyContent
  }

  toCssAlignItems = (alignVertical: AlignVertical | AxisAlign): Property.AlignItems => {
    let alignItems: Property.AlignItems = 'start'
    if (alignVertical === 'CENTER') {
      alignItems = 'center'
    }
    if (alignVertical === 'BOTTOM' || alignVertical === 'END') {
      alignItems = 'end'
    }
    return alignItems
  }

  toCssAlignContent = (axisDistribute: AxisDistribute): Property.AlignContent => {
    let alignContent: Property.AlignContent = 'start'
    if (axisDistribute === 'CENTER') {
      alignContent = 'center'
    }
    if (axisDistribute === 'END') {
      alignContent = 'end'
    }
    if (axisDistribute === 'SPACE_BETWEEN') {
      alignContent = 'space-between'
    }
    if (axisDistribute === 'SPACE_AROUND') {
      alignContent = 'space-around'
    }
    return alignContent
  }

  toCssTextStyle = (textStyle: TextStyle, theme = this.defaultTheme) => {
    const plainTextStyle = this.toCalcTextStyle(textStyle, theme)
    const textAlign = this.toCssTextAlign(plainTextStyle.textAlignHorizontal)
    const verticalAlign = this.toCssVerticalAlign(plainTextStyle.textAlignVertical)

    const style: React.CSSProperties = {
      fontFamily: plainTextStyle.fontFamily ?? undefined,
      fontWeight: plainTextStyle.fontWeight,
      fontSize: `${plainTextStyle.fontSize / this.pxUnit}rem`,
      lineHeight: plainTextStyle.lineHeight,
      letterSpacing: plainTextStyle.letterSpacing,
      textAlign,
      verticalAlign,
      color: plainTextStyle.fills.length > 0 ? this.toCssColor(this.toCalcPaint(plainTextStyle.fills[0], theme).color) : 'black',
      wordBreak: 'break-word', // MEMO: ここの制御をどうするか考えないといけない
    }

    if (plainTextStyle.lineBreak === 'BREAK') {
      style['wordBreak'] = 'break-all'
    }

    if (plainTextStyle.lineBreak === 'NO_BREAK') {
      style['whiteSpace'] = 'nowrap'
    }

    return style
  }
}

const transpiler = new ReactStyleTranspiler()
export default transpiler
