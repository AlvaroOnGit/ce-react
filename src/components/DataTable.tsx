import React from 'react';
import type { DataTableProps } from '../types/DataTable.types';
import { useEditState } from '../hooks/useEditState'
import '../styles/DataTable.css';

export function DataTable<T extends Record<string, unknown>>({
  data, columns, keyField, onSave, onDelete}: DataTableProps<T>) {

    const { editState, startEdit, updateDraft, cancelEdit, commitEdit } = useEditState<T>()

    const getKey  = (row: T): React.Key => row[keyField] as React.Key
    const isEditing = (row: T) =>
        editState !== null && editState.rowKey === getKey(row)

    const getDraftValue = (field: keyof T): T[keyof T] => {
        if (!editState) return '' as T[keyof T]
        return field in editState.editDraft
            ? editState.editDraft[field] as T[keyof T]
            : editState.original[field]
    }

    const handleSave = () => {
        const result = commitEdit()
        if (result && onSave) onSave(result.original, result.draft)
    }

    return (
        <table className="data-table">
            <thead><tr>
                {columns.map(col => (
                    <th key={String(col.key)}>{col.header}</th>
                ))}
                <th>Acciones</th>
            </tr></thead>
            <tbody>
            {data.map(row => (
                <tr key={getKey(row)}>
                    {columns.map(col => (
                        <td key={String(col.key)}>
                            {isEditing(row) && col.editable ? (
                                <input
                                    value={String(getDraftValue(col.key) ?? '')}
                                    onChange={e =>
                                        updateDraft(col.key, e.target.value as T[keyof T])
                                    }
                                />
                            ) : (
                                col.render
                                    ? col.render(row[col.key], row)
                                    : String(row[col.key])
                            )}
                        </td>
                    ))}
                    <td>
                        {isEditing(row) ? (
                            <>
                                <button onClick={handleSave}>💾 Guardar</button>
                                <button onClick={cancelEdit}>❌ Cancelar</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => startEdit(row, getKey(row))}>✎ Editar</button>
                                {onDelete && (
                                    <button onClick={() => onDelete(row)}>⌫ Borrar</button>
                                )}
                            </>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}