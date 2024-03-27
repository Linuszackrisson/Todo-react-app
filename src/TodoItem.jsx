// TodoItem.jsx
import React, { useState } from 'react';

function TodoItem({ todo, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const [editedDate, setEditedDate] = useState(todo.date);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editedTask.trim() !== '' && editedDate !== '') {
      const updatedTodo = {
        task: editedTask,
        date: editedDate
      };
      onEdit(updatedTodo);
      setIsEditing(false);
    }
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <input
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
        </>
      ) : (
        <>
          <div>{todo.task}</div>
          <div>{todo.date}</div>
          <button onClick={handleEdit}>⚙️</button>
          <button onClick={onDelete}>❌</button>
          
        </>
      )}
    </div>
  );
}

export default TodoItem;
