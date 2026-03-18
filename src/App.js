import React, { useState , useEffect } from "react";
import TodoItem from "./component/TodoItem";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search , setSearch] = useState("");

  const addTask = () => {
    if (task.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

 const filteredTodos = todos
  .filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  })
  .filter(todo =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if(savedTodos){
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
// task Counter
  const remainingTasks = todos.filter(todo => !todo.completed).length;
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  }

  const editTodo = (id, newText) => {
    setTodos(
      todos.map(todo => todo.id === id ? {...todo, text: newText } : todo)
    );
  };


  const deleteAll = () => {
    setTodos(todos.filter(todo => ""));
  };
  return(
    <div className="app-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          placeholder="Add a task..."
          onChange={(e) => setTask(e.target.value)}
        />

         <button className="add-button" onClick={addTask}>Add</button>
      </div>
      <div className="task-footer">
        <p className="task-counter">
          {remainingTasks} task{remainingTasks !== 1 ? 's':''} left
        </p>
        <button className="clear-btn" onClick={clearCompleted}>Clear Completed</button>
        <button className="delete-all" onClick={deleteAll}>deleteAll</button>
      </div>

      <div className="search-container">
        <input
        type = "text"
        placeholder="Search tasks..."
        value = {search}
        onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>



      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </ul>
    </div>
    );
}

export default App;
