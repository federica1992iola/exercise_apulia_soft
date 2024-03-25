import { RowExampleData } from "../example-table/ExampleTable";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Anchor = 'top' | 'left' | 'bottom' | 'right';
export type PageIcon = 'home' | 'star';
export const drawerWidth = 250;

export interface IPage {
    icon?: PageIcon,
    route: string,
    name: string
}
export type DrawerState = {
    top?: boolean,
    left?: boolean,
    bottom?: boolean,
    right?: boolean
}
export interface IRequestOptions {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'OPTIONS',
    headers: {'Content-Type': 'application/json'},
    body?: any
}
export interface IResponseData {
    value: RowExampleData[]
}
export interface IResponseError {
    message: string
}
