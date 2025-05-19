import { useState } from "react";

function TodoList({ onAddTodo, onLogoutUser, API_URL }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const logoutUser = async () => {
        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getAuthToken()}`
                }
            });

            if (response.status === 200) {
                // Remove cookie with token
                document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
                onLogoutUser();
            } else {
                alert("Error with logging out, try again.");
            }
        } catch(error) {
            console.log(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddTodo(title, description);
        setTitle('');
        setDescription('');
    }

    return (
        <section id="todo_app_container" className="container">
          <button onClick={onLogoutUser}>Logout</button>
          <section className="form_container">
              <h3>Todo List</h3>
              <form onSubmit={handleSubmit} id="add_todo_form">
                  <section className="form_group">
                      <label htmlFor="add_todo_title">Title:</label>
                      <input 
                        name="title" 
                        type="text" 
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                        required 
                      />
                  </section>
                  <section className="form_group">
                      <label htmlFor="add_todo_description">Description:</label>
                      <input 
                        name="description" 
                        type="text" 
                        value={description}
                        onChange={e => setDescription(e.target.value)} 
                        required 
                      />
                  </section>
                  <section className="submit_button_container">
                      <button className="submit_button" type="submit">Add Todo</button>
                  </section>
              </form>
              <ul id="todo_list_container">

              </ul>
          </section>
        </section>
    )
}

export default TodoList;