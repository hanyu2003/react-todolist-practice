const MIN_DATE = "2020-01-01";   // ⭐ 最早允許的任務起始日
const MAX_DATE = "2030-12-31";   // ⭐ 最晚允許的任務截止日

function AddTodo({ formData, dispatch, onAdd }) {
    return (
        <div className='flex gap-4'>
            <input
                type='text'
                placeholder='Todo Name'
                value={formData.itemName}
                onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'itemName', value: e.target.value, form: 'add_formData'})}
                className='border p-2 rounded w-40'
            />
            <input
                type="date"                              // ⭐ date 格式輸入
                placeholder="Due Date"
                value={formData.dueDate}
                onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'dueDate', value: e.target.value, form: 'add_formData'})}
                className="border p-2 rounded w-40"
                min={MIN_DATE}     // ⭐ 用變數，不硬寫
                max={MAX_DATE}
            />
            <input
                type="text"
                placeholder="Assignee"
                value={formData.assignee}
                onChange={e => dispatch({ type: 'UPDATE_FIELD', field: 'assignee', value: e.target.value, form: 'add_formData'})}
                className="border p-2 rounded w-40"
                />
            <button 
                className='bg-purple-300 text-white px-4 py-2 rounded'
                onClick={onAdd}
                disabled={!formData.itemName.trim() || !formData.dueDate.trim() || !formData.assignee.trim()} // ⭐ 按鈕限制
            >
                Add
            </button>
        </div>
    )
}

export default AddTodo;