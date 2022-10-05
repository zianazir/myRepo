import React, { useState } from "react";

const SearchBar = () => {

    const getLocalItem = () => {
        let list = localStorage.getItem("list");
        if (list) {
          return JSON.parse(localStorage.getItem("list"));
        } else {
          return [];
        }
      };
      useEffect(() => {
        localStorage.setItem("list", JSON.stringify(List));
      }, [List]);
      
  const [searchId, setSearchId] = useState('');
  const [seacrh, setSeacrh] = useState(false);
  const [filter, setFilter] = useState(flase);

  const handleDdm = (event)=>{
    const getId = event.target.value
    setSearchId(getId)
  }

  return (
    <div>
      <select onChange={(e)=>{handleDdm(e)}}>
        <option >Select--</option>
        {myArray.map((element) => {
          return <option key={element.id} value={element.id}>{element.name}</option>;
        })}
      </select>
      {myArray.filter((val) => {
        if (searchId == "") {
          return val;
        }else if(searchId === val.id){
            return val.name
        }
      }).map((elem) => {
        return (
        
          <table className="showData" key={elem.id}>
            <tr>
              <td style={{ padding: "5px 50px" }}>{elem.name} </td>
              <td>
                <button className="btn1" onClick={() => handleDelete(elem.id)}>
                  Done
                </button>
                <button className="btn1" onClick={() => handleEdit(elem.id)}>
                
                  Edit
                </button>
              </td>
            </tr>
          </table>
        );
      })}
    </div>
  );
};

export default SearchBar;
