import React from 'react';
import { Property } from 'csstype';
import { AlignHorizontal, AlignVertical, ThemeProps, AxisAlign, AxisDistribute, Color, SizingMode, SolidPaint, Paint, PlainTextStyle, TextStyle } from '@funii-inc/funiate-types';
declare class ReactStyleTranspiler {
    constructor(pxUnit?: number, defaultTheme?: ThemeProps);
    pxUnit: number;
    defaultTheme: ThemeProps;
    private isHex;
    private isRgba;
    private hexToColor;
    private rgbaToColor;
    toCalcPaint: (paint: Paint, theme?: ThemeProps) => SolidPaint;
    toCalcTextStyle: (textStyle: TextStyle, theme?: ThemeProps) => PlainTextStyle;
    toCssColor: (color: Color) => Property.Color;
    toColor: (colorCode: string, a?: number | undefined) => {
        a: number;
        r: number;
        g: number;
        b: number;
    };
    toCssPadding: (padding: number[]) => Property.Padding;
    toCssBorderRadius: (cornerRadius: number[]) => Property.BorderRadius;
    toCssHeight: (height: number | null, sizingMode: SizingMode, py?: number | undefined) => (string & {}) | "auto";
    toCssWidth: (width: number | null, sizingMode: SizingMode, px?: number | undefined) => (string & {}) | "auto";
    toCssBorder: (stroke: Paint | null, strokeWeight: number, theme?: ThemeProps) => Property.Border;
    toCssTextAlign: (alignHorizontal: AlignHorizontal) => Property.TextAlign;
    toCssVerticalAlign: (alignVertical: AlignVertical) => Property.VerticalAlign;
    toCssJustifyContent: (alignHorizontal: AlignHorizontal | AxisAlign) => Property.JustifyContent;
    toCssAlignItems: (alignVertical: AlignVertical | AxisAlign) => Property.AlignItems;
    toCssAlignContent: (axisDistribute: AxisDistribute) => Property.AlignContent;
    toCssTextStyle: (textStyle: TextStyle, theme?: ThemeProps) => React.CSSProperties;
}
declare const transpiler: ReactStyleTranspiler;
export default transpiler;
//# sourceMappingURL=transpiler.d.ts.map