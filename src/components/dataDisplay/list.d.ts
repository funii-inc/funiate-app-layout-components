import React from 'react';
declare type ListProps = {
    children?: React.ReactNode;
};
declare const List: {
    ({ children }: ListProps): JSX.Element;
    Item: import("styled-components").StyledComponent<"div", any, {}, never>;
    ItemText: import("styled-components").StyledComponent<"div", any, {
        active: boolean;
        activeColor: string;
        color?: string | undefined;
    }, never>;
    ItemIcon: import("styled-components").StyledComponent<"div", any, {
        active: boolean;
        activeColor: string;
        color?: string | undefined;
    }, never>;
};
export default List;
//# sourceMappingURL=list.d.ts.map