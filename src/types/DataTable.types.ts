import React from 'react';

export interface ColumnDef<T> {
    key:      keyof T;
    header:   string;
    editable?: boolean;
    width?:   string;
    render?:  (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
    data:      T[];
    columns:   ColumnDef<T>[];
    keyField:  keyof T;          // propiedad única para React key
    onSave?:   (original: T, changes: Partial<T>) => void;
    onDelete?: (row: T) => void;
    caption?:  string;
}

export interface EditState<T> {
    rowKey:    React.Key;
    original:  T;               // snapshot inmutable
    editDraft: Partial<T>;      // ← Partial<T>: cambios parciales
}