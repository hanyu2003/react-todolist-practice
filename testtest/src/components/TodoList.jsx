// src/components/TodoLists.jsx
// import { useState } from 'react';
// import { useReducer } from 'react';
import { useTodoContext } from '../TodoContext';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import FilterBar from './FilterBar';
import { useNavigate } from 'react-router-dom';

// const MIN_DATE = "2020-01-01";   // ⭐ 最早允許的任務起始日
// const MAX_DATE = "2030-12-31";   // ⭐ 最晚允許的任務截止日
// const statusOrder = ['Not Started', 'Progress', 'Done', 'Archived'];

// function isValidDateInRange(dateStr) {
//   const date = new Date(dateStr);
//   const min = new Date(MIN_DATE); // ⭐ 拿上面變數來比較
//   const max = new Date(MAX_DATE);
//   return (
//     !isNaN(date.getTime()) &&
//     date >= min &&
//     date <= max
//   );
// }

function TodoList() { 
    const {state, dispatch} = useTodoContext();
    const { todos, selectedStatus, add_formData, edit_formData, editingId} = state;   //跟下面的一樣
    // const todos = state.todos;
    // const selectedStatus = state.selectedStatus;
    const navigate = useNavigate();

    return (
        <div className='space-y-5'>
            <AddTodo formData={add_formData} dispatch={dispatch} onAdd={() => dispatch({ type: 'ADD_TODO'})} />
            <FilterBar selectedStatus={selectedStatus} setSelectedStatus={(status) => dispatch({ type: 'SET_STATUS_FILTER', status })} />
            {todos.filter(todo => selectedStatus === 'All' || todo.status === selectedStatus)
                .map(todo => (
                    <div key = {todo.id} className='cursor-pointer' >
                        {editingId === todo.id && (
                            <EditTodo editForm={edit_formData} dispatch={dispatch} 
                            onEditSave={() => dispatch({ type: 'EDIT_SAVE' })} 
                            onEditCancel={() => dispatch({ type: 'EDIT_CANCEL' })} />
                        )} 
            
                        <TodoItem
                            todo={todo}
                            onStatusChange={() => dispatch({ type: 'CHANGE_STATUS', id: todo.id })}
                            onDelete={() => dispatch({ type: 'DELETE_TODO', id: todo.id})}
                            onEdit={() => dispatch({ type: 'EDIT_START', todo})}
                            onClick={() => navigate(`/todos/${todo.id}`)}
                        />
                    </div>
            ))}
        </div>
    );
}

export default TodoList;