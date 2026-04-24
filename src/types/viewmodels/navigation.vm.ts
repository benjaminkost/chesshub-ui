import React from "react";

export interface NavItem {
    label: string;
    path: string;
    icon?: React.ReactNode;
}

export interface MenuElement {
    label: string,
    path: string
    action?: () => void;
}