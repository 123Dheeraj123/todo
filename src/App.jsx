import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { LiaEdit } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  };

  const handleEdit = (id, newTodo) => {
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, todo: newTodo } : item
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-xl">!Task-Manage your todo at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h1 className="text-lg">Add a Todo</h1>
          <input
            onChange={handleChange}
            value={todo}
            className="w-full rounded-full px -5 py-1"
            type="text"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="disabled:bg-violet-400 text-sm font-bold  bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md"
          >
            Save
          </button>
        </div>
        <div className="flex items-center my-3">
          <input className="my-4"
            type="checkbox"
            onChange={toggleFinished}
            checked={showFinished}
          />
          <label className="ml-2">Show Unfinished</label>
        </div>
        <h2 className="text-l font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No todos to display</div>}
          {todos
            .filter(item => showFinished || !item.isCompleted)
            .map(item => (
              <div key={item.id} className="todo flex justify-between md:w-1/2 my-3">
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => handleCheckbox(item.id)}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={() => handleEdit(item.id, prompt("Edit your todo", item.todo))}
                    className="text-sm font-bold mx-1 bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md"
                  >
                   <LiaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-sm font-bold mx-1 bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
