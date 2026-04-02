import React from 'react';
import { useState, useCallback } from 'react';
import type { EditState } from '../types/DataTable.types';

export function useEditState<T>() {
    const [editState, setEditState] =
        useState<EditState<T> | null>(null)

    const startEdit = useCallback((row: T, key: React.Key) => {
        setEditState({ rowKey: key, original: row, editDraft: {} })
    }, [])

    const updateDraft = useCallback(
        <K extends keyof T>(field: K, value: T[K]) => {
            setEditState(prev => {
                if (!prev) return null
                return {
                    ...prev,
                    editDraft: { ...prev.editDraft, [field]: value } satisfies Partial<T>,
                }
            })
        }, []
    )

    const cancelEdit = useCallback(() => setEditState(null), [])

    const commitEdit = useCallback(() => {
        if (!editState) return null
        const result = {
            original: editState.original,
            draft: editState.editDraft
        }
        setEditState(null)
        return result
    }, [editState])

    return { editState, startEdit, updateDraft, cancelEdit, commitEdit }
}