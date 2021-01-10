import { TemplateRef } from '@angular/core';

export interface IRow {
    rowContent: TemplateRef<HTMLElement>;
    rowActions: IRowAction[];
    data: any;
    marked: boolean;
}

export interface ITreeRowData {
    item: {
        [propName: string]: any
        children: any[]
    };
    level: number;
    expandable: boolean;
    children?: ITreeRowData[];
}

export interface IRowAction {
    id: string;
    title: string;
    icon: string;
    iconStyle: string;
    handler: (data: object) => void;
    isVisible: (data: object) => boolean;
}

export interface IActionClickData {
    action: IRowAction;
    data: object;
}


