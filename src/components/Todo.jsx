import { useEffect, useState } from "react";

export default function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  //[{value:"learn react",isCompleted:false,id:time},{},{}]
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
    <div>
      <div>
        <input
          value={task}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          type="text"
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <div>
        {todos.map((todo) => {
          return (
            <div style={{ margin: "0.5rem" }} key={todo.id}>
              {todo.isCompleted ? (
                <span
                  style={{
                    marginRight: "2rem",
                    textDecoration: "line-through",
                  }}
                >
                  {todo.value}
                </span>
              ) : (
                <span style={{ marginRight: "2rem" }}>{todo.value}</span>
              )}

<span
  onClick={() => handleComplete(todo.id)}
  style={{ marginRight: "0.5rem", cursor: "pointer" }}
>
  ✔️
</span>

<span
  onClick={() => handleDelete(todo.id)}
  style={{ cursor: "pointer" }}
>
  ╳
</span>

            </div>
          );
        })}
      </div>
    </div>
  );
}
