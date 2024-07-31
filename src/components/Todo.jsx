import { useEffect, useState } from "react";

export default function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  console.log(todos);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const addTodo = () => {
    const newTodos = todos.map((todo) => {
      return { ...todo };
    });
    newTodos.push({
      value: task,
      isCompleted: false,
      id: new Date().getTime(),
    });
    setTodos(newTodos);
    setTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const handleDelete = (id) => {
    const filteredTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filteredTodo);
  };

  const handleComplete = (id) => {
    const newTodos = todos.map((todo) => {
      return { ...todo };
    });
    newTodos.forEach((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div style={{ display: "flex", justifyContent: "center", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ margin: "50px", textAlign: "center" }}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            value={task}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            type="text"
            placeholder="Add a new task..."
            style={{
              padding: "0.75rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              fontSize: "1.25rem",
              width: "400px",
              marginRight: "0.5rem",
              outline: "none",
              transition: "border-color 0.3s, box-shadow 0.3s",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          />
          <button
            onClick={addTodo}
            style={{
              padding: "0.75rem 1.25rem",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#6c757d", // Nordic grey
              color: "#fff",
              fontSize: "1.25rem",
              cursor: "pointer",
              transition: "background-color 0.3s",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            Add Task
          </button>
        </div>
        <div style={{ textAlign: "left" }}>
          {todos.map((todo) => {
            return (
              <div
                style={{
                  margin: "0.5rem",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  backgroundColor: "#e0e0e0", // Slightly darker grey background
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                }}
                key={todo.id}
              >
                <span
                  style={{
                    flexGrow: 1,
                    fontSize: "1.25rem",
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                    color: todo.isCompleted ? "#888" : "#000",
                  }}
                >
                  {todo.value}
                </span>

                <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                  <span
                    onClick={() => handleComplete(todo.id)}
                    style={{ cursor: "pointer", color: "#6c757d", fontSize: "1.25rem", marginRight: "0.75rem" }} // Added margin-right for spacing
                  >
                    ✔️
                  </span>

                  <span
                    onClick={() => handleDelete(todo.id)}
                    style={{ cursor: "pointer", color: "#ff4d4d", fontSize: "1.25rem" }}
                  >
                    ╳
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
