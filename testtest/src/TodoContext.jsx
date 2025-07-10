import { createContext, useContext, useReducer } from "react";

const MIN_DATE = "2020-01-01";   // ⭐ 最早允許的任務起始日
const MAX_DATE = "2030-12-31";   // ⭐ 最晚允許的任務截止日
const statusOrder = ['Not Started', 'Progress', 'Done', 'Archived'];

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


const initialStates = {
    todos: [
        { id: 1, itemName: 'Todo 1', dueDate: '2025/05/21', assignee: 'a', status: 'Not Started', createdAt: '2025/05/02' },
        { id: 2, itemName: 'Todo 2', dueDate: '2025/05/22', assignee: 'bb', status: 'Progress', createdAt: '2025/05/02'  },
        { id: 3, itemName: 'Todo 3', dueDate: '2025/05/23', assignee: 'ccc', status: 'Done', createdAt: '2025/05/02'  },
        { id: 4, itemName: 'Todo 4', dueDate: '2025/05/21', assignee: 'a', status: 'Not Started', createdAt: '2025/05/02'  },
        { id: 5, itemName: 'Todo 5', dueDate: '2025/05/22', assignee: 'bb', status: 'Progress', createdAt: '2025/05/02'  },
        { id: 6, itemName: 'Todo 6', dueDate: '2025/05/23', assignee: 'ccc', status: 'Done', createdAt: '2025/05/02'  },
        { id: 7, itemName: 'Todo 7', dueDate: '2025/05/24', assignee: 'dddd', status: 'Archived', createdAt: '2025/05/02'  },
    ],
    selectedStatus: 'All',
    add_formData: { itemName: '', dueDate: '', assignee: '' },
    edit_formData: { itemName: '', dueDate: '', assignee: ''},
    editingId: null,
};

function nextStatus(currentStatus) {
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    return statusOrder[nextIndex];
}

function my_reducer(state, action) {
  switch (action.type) {
    case 'DELETE_TODO':
        return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== action.id),
        };
    case 'CHANGE_STATUS':
        return {
            ...state,
            todos: state.todos.map((t) => 
                t.id === action.id ? { ...t, status: nextStatus(t.status), updatedAt: new Date().toLocaleString('zh-tw')} : t
            ),
        };
    case 'SET_STATUS_FILTER':
        return {
            ...state,
            selectedStatus: action.status,
        };
    case 'UPDATE_FIELD':
        return {
            ...state,
            [action.form]: {...state[action.form], [action.field]: action.value},
        };
    case 'ADD_TODO':
        if (!state.add_formData.itemName.trim() || !state.add_formData.dueDate.trim() || !state.add_formData.assignee.trim() || !isValidDateInRange(state.add_formData.dueDate)) return;
        return {
            ...state,
            todos: [
                ...state.todos,
                {
                    id: Date.now(),
                    itemName: state.add_formData.itemName,
                    dueDate: state.add_formData.dueDate,
                    assignee: state.add_formData.assignee,
                    status: 'Not Started',
                    createdAt: new Date().toLocaleString('zh-tw'),
                },
            ],
            add_formData: {itemName: '',dueDate: '',assignee: ''},
        };
    case 'EDIT_START':
        return {
            ...state,
            editingId: action.todo.id,
            edit_formData: {itemName: action.todo.itemName, dueDate: action.todo.dueDate, assignee: action.todo.assignee},
        };
    case 'EDIT_SAVE':
        if ( !state.edit_formData.itemName.trim() || !state.edit_formData.dueDate.trim() || !state.edit_formData.assignee.trim()) return;
        return {
            ...state,
            todos: state.todos.map((t) => 
                t.id === state.editingId
                    ? { ...t, itemName: state.edit_formData.itemName, dueDate: state.edit_formData.dueDate, assignee: state.edit_formData.assignee, updatedAt: new Date().toLocaleString('zh-tw')}
                    : t
            ),
            editingId: null,
            edit_formData: { itemName: '', dueDate: '', assignee: ''},
        };  
    case 'EDIT_CANCEL': 
        return {
            ...state,
            editingId: null,
            edit_formData: { itemName: '', dueDate: '', assignee: ''},
        };

    default:
        return state;
  }
}

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

export function TodoProvider({ children }) { 
    const [state, dispatch] = useReducer(my_reducer, initialStates);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
}