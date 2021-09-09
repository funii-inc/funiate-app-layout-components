import React from 'react';
declare type DrawerProps = {
    open: boolean;
    onClose?: React.MouseEventHandler<HTMLDivElement>;
    width?: number;
    children?: React.ReactNode;
};
declare const Drawer: ({ open, onClose, width, children }: DrawerProps) => JSX.Element;
export default Drawer;
//# sourceMappingURL=drawer.d.ts.map