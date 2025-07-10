import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    const routes = [
        { label: 'Home', path: '/'},
        { label: 'Todo List', path: '/todos'},
    ];
    const buttonClass = 'px-4 py-2 w-32 bg-stone-400 text-white rounded hover:bg-stone-500';

    return (
        <nav className="bg-gray-100 px-4 py-2">
            <ul className="flex space-x-4">
                {routes.map(route => (
                    <li key={route.path}>
                        <button className={buttonClass} onClick={() => navigate(route.path)}>
                            {route.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavBar;