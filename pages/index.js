// pages/index.js
import { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "../components/TodoItem";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      const response = await axios.get("/api/todos");
      setTodos(response.data.data);
    }
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const response = await axios.post("/api/todos", { task: newTask });
    setTodos([...todos, response.data.data]);
    setNewTask("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const updateTodo = async (id, updatedTodo) => {
    const response = await axios.put(`/api/todos/${id}`, updatedTodo);
    setTodos(
      todos.map((todo) => (todo._id === id ? response.data.data : todo))
    );
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTodo}>Add Task</button>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
    </div>
  );
}
