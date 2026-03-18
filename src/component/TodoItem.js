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
        <div className="togglecomplet">
          <button className= {todo.completed ? "undo" : "complete"}  onClick={() => toggleComplete(todo.id)} >
            {todo.completed ? "undo" : "DO"}
          </button>
        <span
          className={todo.completed ? "completed" : ""}
        >
          {todo.text}
        </span>
        </div>
      )}

      <div className="buttons">
        <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>

    </li>
  );
}

export default TodoItem;