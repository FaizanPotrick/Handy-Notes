import React, { useState, useEffect } from "react";
import CreateTodos from "./Components/CreateTodos";
import Navbar from "./Components/Navbar";
import TodosItem from "./Components/TodosItem";
import UpdateTodos from "./Components/UpdateTodos";

function App() {
  const [text, setText] = useState({
    title: "",
    description: "",
    tag: "",
    date: "",
  });
  const textChange = (e) => {
    const { value, name } = e.target;
    setText(() => {
      return {
        ...text,
        [name]: value,
      };
    });
  };
  const [todos, setTodos] = useState(() => {
    let savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const submitHandeler = (e) => {
    e.preventDefault();
    if (text !== "") {
      setTodos([
        ...todos,
        {
          title: text.title,
          description: text.description,
          tag: text.tag,
          date: new Date().toLocaleTimeString(),
          id: new Date().getTime().toString(),
        },
      ]);
    }
    setText({
      title: "",
      description: "",
      tag: "",
    });
    showAlert(" Saved");
  };
  const deleteHandeler = (e) => {
    setTodos(todos.filter((el) => el.id !== e.id));
    showAlert(" Deleted");
  };
  const [etext, setEtext] = useState({
    title: "",
    description: "",
    tag: "",
    date: "",
  });
  const etextChange = (e) => {
    const { value, name } = e.target;
    setEtext(() => {
      return {
        ...etext,
        [name]: value,
      };
    });
  };
  const editHandeler = (e) => {
    setEtext({
      ...text,
      title: e.title,
      description: e.description,
      tag: e.tag,
      date: new Date().toLocaleTimeString(),
      id: e.id,
    });
  };
  const esubmitHandeler = (e) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => {
        return todo.id === etext.id ? etext : todo;
      })
    );
    showAlert(" Updated");
  };
  const [alert, setAlert] = useState(null);
  const [color, setColor] = useState(null);

  const showAlert = (s) => {
    setColor("success");
    setAlert("To-do has been successfully" + s);
    setTimeout(() => {
      setAlert(null);
      setColor(null);
    }, 2000);
  };
  const [search, setSearch] = useState("");
  const searchChange = (e) => {
    setSearch(e.target.value);
  };
  console.log(search);
  return (
    <div className="overflow-hidden">
      <Navbar serach={search} searchChange={searchChange} />
      <div
        className={`alert alert-${color} position-absolute start-50 translate-middle`}
        style={{ zIndex: "500", top: "4vh" }}
      >
        {alert}
      </div>
      <CreateTodos
        textChange={textChange}
        title={text.title}
        description={text.description}
        tag={text.tag}
        submitHandeler={submitHandeler}
        showAlert={showAlert}
      />
      <UpdateTodos
        etextChange={etextChange}
        title={etext.title}
        description={etext.description}
        tag={etext.tag}
        etext={etext}
        esubmitHandeler={esubmitHandeler}
      />
      <div className="row justify-content-center">
        <h1 className="text-center">{todos.length === 0 && "No Todo List"}</h1>
        {todos
          .filter((target) => {
            if (search === "") {
              return target;
            } else if (
              target.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return target;
            } else if (
              target.tag.toLowerCase().includes(search.toLowerCase())
            ) {
              return target;
            }
          })
          .map((target) => {
            return (
              <TodosItem
                title={target.title}
                description={target.description}
                tag={target.tag}
                date={target.date}
                key={target.id}
                target={target}
                deleteHandeler={deleteHandeler}
                editHandeler={editHandeler}
              />
            );
          })}
      </div>
      <button
        type="button"
        className="btn btn-dark rounded-circle shadow-sm p-0"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "50px",
          width: "60px",
          height: "60px",
        }}
        data-bs-toggle="modal"
        data-bs-target="#createNotes"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
          />
        </svg>
      </button>
    </div>
  );
}
export default App;
