// src/components/TodoLists.jsx
import { useState } from 'react';
import TodoItem from './TodoItem';

const statusOrder = ['Not Started', 'Progress', 'Done', 'Archived'];

const initialTodos = [
  { id: 1, itemName: 'Todo 1', dueDate: '2025/05/21', assignee: 'a', status: 'Not Started' },
  { id: 2, itemName: 'Todo 2', dueDate: '2025/05/22', assignee: 'bb', status: 'Progress' },
  { id: 3, itemName: 'Todo 3', dueDate: '2025/05/23', assignee: 'ccc', status: 'Done' },
  { id: 4, itemName: 'Todo 4', dueDate: '2025/05/24', assignee: 'dddd', status: 'Archived' },
];

export default function TodoLists() {
  const [todos, setTodos] = useState(initialTodos);

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

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onStatusChange={() => handleStatusChange(todo.id)}
        />
      ))}
    </div>
  );
}
