import React from 'react';
import { ThemeProps } from '@funii-inc/funiate-types';
declare type ScreenViewProps = {
    children?: React.ReactNode;
    goBack?: () => void;
    screenStyle?: React.CSSProperties;
    headerShown?: boolean;
    headerTitle?: string;
    headerStyle?: React.CSSProperties;
    theme?: ThemeProps;
};
declare const ScreenView: ({ children, goBack, screenStyle, headerShown, headerTitle, headerStyle }: ScreenViewProps) => JSX.Element;
export default ScreenView;
//# sourceMappingURL=screenView.d.ts.map