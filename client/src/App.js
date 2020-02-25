import React, {useState,useEffect} from 'react';
import Note from './components/Note';
import './App.css';

// const styles={}

function App(){

  const [note,setNote] = useState(null);
  const [items,setItems] = useState(null);

  useEffect(()=>{
    get_notes();
  },[]);

  //CREATE
  function create_note(data){
    console.log(JSON.stringify(data));
    fetch("http://localhost:3001/notes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  //READ
  function get_notes(){
    fetch("http://localhost:3001/notes", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response)=>response.json())
    .then((data)=>setItems(data));
  }

  //UPDATE
  function update_note(data){
    fetch(`http://localhost:3001/notes/update/${data.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  //DELETE
  function delete_note(id){
    fetch(`http://localhost:3001/notes/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      setNote(null);
      get_notes();
  }


  //HANDLERS
  function handleSubmit(data){
    if(data.title !== "" || data.body !== ""){
      if(data.id==null){
        create_note(data);
      } else {
        update_note(data);
      }

      get_notes();
    }
    setNote(null);
  }

  function handleDelete(id){
    if(id !== null) delete_note(id);
    setNote(null);
  }

  const init_note = () => {
    return {
      id:null,
      title:"",
      body:"",
      date_created:"",
      date_modified:"",
    }
  }

  return (
    <div className="App">
      { note == null ?
        <React.Fragment>
          { items == null ? null :
              <ul className="list_of_items">
                {items.map((item,index)=>
                  <li 
                    key={item.id} 
                    className="list_item"
                    onClick={() => setNote(item)}
                  >
                    {item.title}
                  </li>
                )}
              </ul>
          }

          <button className="new_btn" onClick={() => setNote(init_note())}>
            New
          </button>
        </React.Fragment>
      : <Note content={note} handleSubmit={handleSubmit} handleDelete={handleDelete}/>
      }
    </div>
  );

}

export default App;
