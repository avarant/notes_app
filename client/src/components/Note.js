import React, {useState} from 'react';

function Note({content,handleSubmit,handleDelete}){

  const date_modified=new Date().toString().slice(0,21);
  const date_created = content.id == null ? date_modified : content.date_created;
  const _id = content == null ? null : content.id;

  const [_title,setTitle] = useState(content == null ? "" : content.title); 
  const [_body,setBody] = useState(content == null ? "" : content.body);

  function _submit(e){
    e.preventDefault();
    handleSubmit({
      id:_id,
      title:_title,
      body:_body,
      date_created:date_created,
      date_modified:date_modified,
    });
  }

  return (
    <React.Fragment>
      <button
        className="nav_btn"
        onClick={_submit}
      >
        Back
      </button>
      <button
        className="nav_btn delete_btn"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>

      <span className="date_time">{date_modified}</span>

      <div className="note_container">
        <form onSubmit={_submit}>
          <input
            className="note_title"
            type="text"
            onChange={e=>setTitle(e.target.value)}
            placeholder=" Title"
            defaultValue={_title}
            autoFocus
          />
          <textarea
            className="note_body"
            onChange={e=>setBody(e.target.value)}
            defaultValue={_body}
          >
          </textarea>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Note;
