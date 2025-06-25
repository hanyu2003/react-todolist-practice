const statuses = ['All', 'Not Started', 'Progress', 'Done', 'Archieved'];

function FilterBar({ selectedStatus, setSelectedStatus}) {
    return (
        <div className="flex gap-2">
            {statuses.map(status => (
                <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1 rounded ${selectedStatus === status ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
                >
                    {status}
                </button>
            ))}
        </div>
    );
}

export default FilterBar;