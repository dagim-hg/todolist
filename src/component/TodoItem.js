import React, { useState } from "react";

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {

  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    editTodo(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">

      {isEditing ? (
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEdit();
          }}
          autoFocus
        />
      ) : (
        <span
          onClick={() => toggleComplete(todo.id)}
          className={todo.completed ? "completed" : ""}
        >
          {todo.text}
        </span>
      )}

      <div className="buttons">
        <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>

    </li>
  );
}

export default TodoItem;