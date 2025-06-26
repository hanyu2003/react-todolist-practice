import ActivityList from './fire_component/ActivityList'

function App() {
    return (
        <div className = "min-h-screen bg-red-50 p-6">
            <h1 className = "text-4xl font-bold text-center mt-2 mb-6">社團活動</h1>
            <div className = "max-w-2xl mx-auto bg-white rounded-3xl shadow-md p-4 space-y-4">
            <ActivityList/>
            </div>
        </div>
    )
}

export default App;