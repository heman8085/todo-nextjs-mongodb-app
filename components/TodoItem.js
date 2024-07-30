// components/TodoItem.js
import { useState } from "react";

export default function TodoItem({ todo, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todo.task);

  const handleUpdate = () => {
    updateTodo(todo._id, { task, completed: todo.completed });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      ) : (
        <span>{todo.task}</span>
      )}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          updateTodo(todo._id, { task: todo.task, completed: !todo.completed })
        }
      />
      {isEditing ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
    </div>
  );
}
