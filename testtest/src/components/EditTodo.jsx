function EditTodo({ editForm, setEditForm, onEditSave, onEditCancel}) {
    return (
        <div className='flex gap-5 bg-yellow-50 p-2 rounded'>
            <input
                type='text'
                className="border p-2 rounded w-32"
                value={editForm.itemName}
                onChange={e => setEditForm({ ...editForm, itemName: e.target.value })}
            />
            <input
                type="date"
                className="border p-2 rounded w-32"
                value={editForm.dueDate}
                onChange={e => setEditForm({ ...editForm, dueDate: e.target.value })}
            />
            <input
                type="text"
                placeholder="Assignee"
                className="border p-2 rounded w-32"
                value={editForm.assignee}
                onChange={e => setEditForm({ ...editForm, assignee: e.target.value })}
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