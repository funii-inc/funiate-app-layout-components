import React from 'react';
declare type AppBarProps = {
    style?: React.CSSProperties;
    children?: React.ReactNode;
};
declare const AppBar: {
    ({ style, children }: AppBarProps): JSX.Element;
    Title: import("styled-components").StyledComponent<"h1", any, {
        color?: string | undefined;
    }, never>;
    Left: import("styled-components").StyledComponent<"div", any, {}, never>;
    Right: import("styled-components").StyledComponent<"div", any, {}, never>;
    Toolbar: import("styled-components").StyledComponent<"div", any, {}, never>;
};
export declare const Toolbar: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const AppBarTitle: import("styled-components").StyledComponent<"h1", any, {
    color?: string | undefined;
}, never>;
export declare const AppBarLeft: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const AppBarRight: import("styled-components").StyledComponent<"div", any, {}, never>;
export default AppBar;
//# sourceMappingURL=appBar.d.ts.map