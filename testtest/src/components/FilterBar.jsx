const statuses = ['All', 'Not Started', 'Progress', 'Done', 'Archieved'];

function FilterBar({ selectedStatus, setSelectedStatus}) {
    return (
        <div className="flex gap-2">
            {statuses.map(status => (
                <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1 rounded ${selectedStatus === status ? 'bg-pink-200 text-black' : 'bg-yellow-50'}`}
                >
                    {status}
                </button>
            ))}
        </div>
    );
}

export default FilterBar;