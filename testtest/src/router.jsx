import { createBrowserRouter } from "react-router-dom";
import App from './App'
import HomePage from "./pages/HomePage";
import TodosPage from "./pages/TodosPage";
import DetailPage from "./pages/DetailPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <HomePage />},
            { path: 'todos', element: <TodosPage />},
            { path: '/todos/:id', element: <DetailPage />}
        ]
    },
])
    
export default router