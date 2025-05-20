import { useState } from "react";


function EditTodoListItem({ item, onEditItem, onCloseOverlay }) {
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);

    const handleSubmit = (event) => {
        event.preventDefault();
        onEditItem(item.id, title, description);
        onCloseOverlay();
    };

    return (
        <section id="todo_list_item_edit" className="overlay">
          <button onClick={onCloseOverlay}>Back</button>
          <section>
              <h3>Edit item</h3>
              <form onSubmit={handleSubmit} id="edit_todo_list_item">
                  <section className="form_group">
                      <label htmlFor="edit_todo_list_title">Title:</label>
                      <input 
                        type="text" 
                        name="title" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                      />
                  </section>
                  <section className="form_group">
                      <label htmlFor="edit_todo_list_description">Description:</label>
                      <input 
                        type="text" 
                        name="descirption" 
                        value={description}
                        onChange={e => setDescription(e.target.value)} 
                      />
                  </section>
                  <section className="submit_button_container">
                      <button type="submit">Submit</button>
                  </section>
              </form>
          </section>
        </section>
    )
}

export default EditTodoListItem;