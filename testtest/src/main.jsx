// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './router.jsx'
import { TodoProvider } from './TodoContext.jsx'
// import App from './App.jsx'
// import App from './fire_App.jsx'

createRoot(document.getElementById('root')).render(
    <TodoProvider>
        {/* <App /> */}
        <RouterProvider router={router} />
    </TodoProvider>,
)
