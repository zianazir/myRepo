import React, { useEffect, useState } from "react";
import "./App.css";

const getLocalItem = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const App = () => {
  const [Todo, setTodo] = useState("");
  const [List, setList] = useState(getLocalItem());
  const [Toggle, setToggle] = useState(true);
  const [TodoId, setTodoId] = useState(null);
  const [searchId, setSearchId] = useState("");

  const [SearchTerm, setSearchTerm] = useState("");

  const [search, setSearch] = useState(false);
  const [filter, setfilter] = useState(false);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(List));
  }, [List]);

  const handleClick = () => {
    if (!Todo) {
      alert("please write something");
    } else if (Todo && !Toggle) {
      setList(
        List.map((elem) => {
          if (elem.id === TodoId) {
            return { ...elem, name: Todo };
          }
          return elem;
        })
      );
      setToggle(true);
      setTodo("");
      setTodoId(null);
    } else {
      const todoList = { id: new Date().getTime().toString(), name: Todo };
      setList([...List, todoList]);
      setTodo("");
    }
  };
  const handleDelete = (index) => {
    const updateTodos = List.filter((elem) => {
      return index !== elem.id;
    });
    setList(updateTodos);
  };
  const handleEdit = (id) => {
    const Edit = List.find((elem) => {
      return elem.id == id;
    });
    setToggle(false);
    setTodo(Edit.name);
    setTodoId(id);
  };

  const handleDdm = (event) => {
    const getId = event.target.value;
    setSearchId(getId);
    setfilter(true);
    setSearch(false);
    getData(getId);
  };

  const getData = () => {
    if (search) {
      if (SearchTerm == "") {
        return List
      } else {
        const searchTodo = List.find((elem) => elem.name == SearchTerm);
        if(searchTodo){
          return [searchTodo];
        }else{
          return List
        }
      }
    }
    else {
      return List
    }
  };
  return (
    <>
      <div className="mainSection">
        <h2>Simple Todo-List APP</h2>
        <p>Click Done when you are done with your Todo</p>
        <div className="center">
          <input
            type="text"
            required
            value={Todo}
            name="title"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />

          {Toggle ? (
            <button className="btn" onClick={handleClick}>
              Add Note
            </button>
          ) : (
            <button className="btn1" onClick={handleClick}>
              Edit
            </button>
          )}
        </div>
        <br />
        <div>
          <input
            type="search"
            placeholder="Seacrh Your Task"
            required
            value={SearchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button
            className="btn"
            onClick={() => {
              getData(SearchTerm);
              setSearch(true);
              setfilter(false);
            }}
          >
            Search
          </button>
        </div>
        <br />
        <select
          onChange={(e) => {
            handleDdm(e);
          }}
        >
          <option value={""}>--Select--</option>
          {List.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })}
        </select>
      </div>

      <h2>Your Todo's</h2>

      <div className="container">
        {List.length === 0 && "No Todo's To Display"}
      </div>

      {getData().filter((val) => {
        if (searchId == "") {
          return val;
        }else if(searchId === val.id){
            return val.name
        }
      }).map((elem) => {
        return (
          <div className="container">
            <table className="showData" key={elem.id}>
              <div className="heading">
                <tr>Todo</tr>
                <tr>Action</tr>
              </div>
              <tr>
                <td style={{ padding: "5px 50px" }}>{elem.name} </td>
                <div className="btns">
                  <td>
                    <button
                      className="btn1"
                      onClick={() => handleDelete(elem.id)}
                    >
                      Done
                    </button>
                    <button
                      className="btn1"
                      onClick={() => handleEdit(elem.id)}
                    >
                      Edit
                    </button>
                  </td>
                </div>
              </tr>
            </table>
          </div>
        );
      })}
    </>
  );
};

export default App;
