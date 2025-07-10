import TodoList from '../components/TodoList';

function TodosPage() {
    return (
        <div className = "min-h-screen bg-pink-50 p-6">
            <h1 className = "text-2xl font-bold text-center mb-10">Todo List</h1>
            <div className = "max-w-2xl mx-auto bg-white rounded-3xl shadow-md p-4 space-y-4">
            <TodoList/>
            </div>
        </div>
    )
}

export default TodosPage;