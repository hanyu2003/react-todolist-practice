function EditTodo({ editForm, dispatch, onEditSave, onEditCancel}) {
    return (
        <div className='flex gap-5 bg-yellow-50 p-2 rounded'>
            <input
                type='text'
                className="border p-2 rounded w-32"
                value={editForm.itemName}
                onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'itemName', value: e.target.value, form: 'edit_formData'})}
            />
            <input
                type="date"
                className="border p-2 rounded w-32"
                value={editForm.dueDate}
                onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'dueDate', value: e.target.value, form: 'edit_formData'})}
            />
            <input
                type="text"
                placeholder="Assignee"
                className="border p-2 rounded w-32"
                value={editForm.assignee}
                onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'assignee', value: e.target.value, form: 'edit_formData'})}
            />
            <button
                className="bg-green-300 text-white px-3 py-1 rounded"
                onClick={onEditSave}
                disabled={!editForm.itemName.trim() || !editForm.dueDate.trim() || !editForm.assignee.trim()}
            >
                Save
            </button>
            <button
                className="bg-gray-300 text-white px-3 py-1 rounded"
                onClick={onEditCancel}
            >
                Cancel
            </button>
        </div>
    )
}

export default EditTodo;