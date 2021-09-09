import React from 'react';
declare type MenuItem = {
    id: string;
    title: string;
    onClick: () => void;
};
declare type TabItem = {
    id: string;
    title: string;
    onClick: () => void;
};
declare type TabViewProps = {
    menuItems?: MenuItem[];
    activeMenuID?: string;
    tabItems?: TabItem[];
    activeTabID?: string;
    children?: React.ReactNode;
    goBack?: () => void;
    screenStyle?: React.CSSProperties;
    headerShown?: boolean;
    headerTitle?: string;
    headerStyle?: React.CSSProperties;
};
declare const TabView: ({ menuItems, activeMenuID, tabItems, activeTabID, children, screenStyle, headerShown, headerTitle, headerStyle, }: TabViewProps) => JSX.Element;
export default TabView;
//# sourceMappingURL=tabView.d.ts.map