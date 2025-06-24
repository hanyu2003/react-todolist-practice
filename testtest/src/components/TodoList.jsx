// src/components/TodoLists.jsx
import { useState } from 'react';
import TodoItem from './TodoItem';

const MIN_DATE = "2020-01-01";   // ⭐ 最早允許的任務起始日
const MAX_DATE = "2030-12-31";   // ⭐ 最晚允許的任務截止日
const statusOrder = ['Not Started', 'Progress', 'Done', 'Archived'];
const initialTodos = [
    { id: 1, itemName: 'Todo 1', dueDate: '2025/05/21', assignee: 'a', status: 'Not Started' },
    { id: 2, itemName: 'Todo 2', dueDate: '2025/05/22', assignee: 'bb', status: 'Progress' },
    // { id: 3, itemName: 'Todo 3', dueDate: '2025/05/23', assignee: 'ccc', status: 'Done' },
    // { id: 4, itemName: 'Todo 4', dueDate: '2025/05/21', assignee: 'a', status: 'Not Started' },
    // { id: 5, itemName: 'Todo 5', dueDate: '2025/05/22', assignee: 'bb', status: 'Progress' },
    // { id: 6, itemName: 'Todo 6', dueDate: '2025/05/23', assignee: 'ccc', status: 'Done' },
    { id: 7, itemName: 'Todo 7', dueDate: '2025/05/24', assignee: 'dddd', status: 'Archived' },
];

function isValidDateInRange(dateStr) {
  const date = new Date(dateStr);
  const min = new Date(MIN_DATE); // ⭐ 拿上面變數來比較
  const max = new Date(MAX_DATE);
  return (
    !isNaN(date.getTime()) &&
    date >= min &&
    date <= max
  );
}

function TodoList() {
    
    const [todos, setTodos] = useState(initialTodos);
    const [formData, setFormData] = useState({
            itemName: '',
            dueDate: '',
            assignee: ''
        })

    function nextStatus(currentStatus) {
        const currentIndex = statusOrder.indexOf(currentStatus);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        return statusOrder[nextIndex];
    }

    function handleStatusChange(id) {
        setTodos(prevTodos =>
        prevTodos.map(todo =>
            todo.id === id
            ? { ...todo, status: nextStatus(todo.status) }
            : todo
        )
        );
    }

    function handlDelete(id) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }

    function handleAdd() {
        if (!formData.itemName.trim() || !formData.dueDate.trim() || !formData.assignee.trim() || !isValidDateInRange(formData.dueDate)) return;
        const newTodo = {
            id: Date.now(),
            itemName: formData.itemName,
            dueDate: formData.dueDate,
            assignee: formData.assignee,
            status: 'Not Started'
        };
        setTodos(prev => [...prev, newTodo]);
        setFormData({ itemName: '', dueDate: '', assignee: ''});
    }

    return (
        <div className='space-y-4'>
            <div className='flex gap-5'>
                <input
                    type='text'
                    placeholder='Todo Name'
                    value={formData.itemName}
                    onChange={e => setFormData({...formData, itemName: e.target.value})}
                    className='border p-2 rounded w-40'
                />
                <input
                    type="date"                              // ⭐ date 格式輸入
                    placeholder="Due Date"
                    value={formData.dueDate}
                    onChange={e => setFormData({...formData, dueDate: e.target.value})}
                    className="border p-2 rounded w-40"
                    min={MIN_DATE}     // ⭐ 用變數，不硬寫
                    max={MAX_DATE}
                />
                <input
                    type="text"
                    placeholder="Assignee"
                    value={formData.assignee}
                    onChange={e => setFormData({...formData, assignee: e.target.value})}
                    className="border p-2 rounded w-40"
                    />
                <button 
                    className='bg-purple-300 text-white px-4 py-2 rounded'
                    onClick={handleAdd}
                    disabled={!formData.itemName.trim() || !formData.dueDate.trim() || !formData.assignee.trim()} // ⭐ 按鈕限制
                >
                    Add
                </button>
            </div>

            {todos.map(todo => (
                <TodoItem
                key={todo.id}
                todo={todo}
                onStatusChange={() => handleStatusChange(todo.id)}
                onDelete={() => handlDelete(todo.id)}
                />
            ))}
        </div>
        
    );
}

export default TodoList;