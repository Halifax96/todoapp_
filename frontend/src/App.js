import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";


function App() {

  const [toDo, setToDo ] =  useState([]);
  const [text, setText ] = useState("");
  const [isUpdatting, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
 
  useEffect(()=>{
    getAllToDo(setToDo)
  },[])

  const updateMode = (_id, text) =>{
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
      
        <div className="top">
          <input 
          type="text" 
          placeholder="Add Todos..."
          value={text}
          onChange={(e)=> setText(e.target.value)}
          />

          <div 
          className="add" 
          onClick={isUpdatting ?
            ()=> updateToDo(toDoId, text, setToDo, setText, isUpdatting )
            :() => addToDo(text, setText, setToDo)}>
            {isUpdatting?"update":"add"}
          </div>
            
        </div>

        <div className="list">
          {toDo.map((item)=> <ToDo
           key={item._id} 
           text={item.text}
           updateMode={()=> updateMode(item._id, item.text)}
           deleteToDo={()=>deleteToDo(item._id, setToDo)}/>)}
        </div>
      </div>
    </div>
  );
}

export default App;
