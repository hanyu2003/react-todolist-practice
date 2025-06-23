import DeleteButton from './DeleteButton';
import StatusButton from './StatusButton';

function Button({ onClick, children }) {
  return (
    <button
      onClick={e => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
}

function TodoItem({ todo, onStatusChange }) {
  const { itemName = 'Unnamed', dueDate = 'No Due Date', assignee = 'Nobody', status = 'Not Started'} = todo;

  const contentJsx = (
    <div className="flex justify-between items-center border-b py-2">
      <span className="text-gray-700">{itemName}</span>
      <span className="text-sm text-gray-500">
        {dueDate === 'No Due Date' ? dueDate : `Due: ${dueDate}`}
      </span>
      <span className="block text-sm text-blue-500">👤 {assignee}</span>
      <div
        className="flex space-x-4 bg-pink-50 items-center p-2"
        onClick={() => alert('You are in the editing area!')}
      >
        <Button onClick={onStatusChange}>
          <StatusButton status={status} />
        </Button>
        <Button>
          <DeleteButton taskName={itemName} />
        </Button>
      </div>
    </div>
  );

  return status === 'Done' ? (
    <div className="opacity-50 line-through">{contentJsx}</div>
  ) : (
    contentJsx
  );
}

export default TodoItem;
