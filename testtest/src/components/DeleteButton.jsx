function DeleteButton( {taskName='Unnamed'} ) {
    //event handler
    function DeleteHandler(taskName) {   
        alert('Delete ' + taskName);
    }

    return (
        <button 
            className = "text-sm text-red-500 hover:underline"
            onClick={() => DeleteHandler(taskName)}
        >
            Delete
        </button>
    )
}

export default DeleteButton