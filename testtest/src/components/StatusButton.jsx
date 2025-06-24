function StatusButton({status}) {
    const colorMap = {
        'Not Started': 'bg-gray-200 text-gray-700',
        'Progress': 'bg-indigo-100 text-blue-800',
        'Done': 'bg-lime-200 text-green-950',
        'Archived': 'bg-orange-100 text-yellow-900'
    };
    const color = colorMap[status] || 'bg-gray-200 text-gray-700';

    return (
        <button className={`text-sm border w-28 rounded px-2 py-1 focus:outline-none ${color}`}>
            {status}
        </button>
    );
}

export default StatusButton;