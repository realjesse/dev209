import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm';

function App() {
  const [count, setCount] = useState(0)

// Code from original project
const API_URL = "http://localhost:3000"
let currentlyViewedItemId = null;

window.onload = () => {
    if (getAuthToken()) {
        showApp();
    }
}

async function loginUser(event) {
    event.preventDefault();
    
    const username = document.querySelector("#login_username").value;
    const password = document.querySelector("#login_password").value;

    // Clear values
    document.querySelector("#login_username").value = "";
    document.querySelector("#login_password").value = "";

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 200) {
            const data = await response.json();
            const token = data.token;
            document.cookie = `authToken=${token};`
            showApp();
        } else {
            alert("Unsuccessful :(")
        }
    }
    catch(error) {
        console.log(error);
    }
}

async function registerUser(event) {
    event.preventDefault();

    const username = document.querySelector("#register_username").value;
    const password = document.querySelector("#register_password").value;

    // Clear values
    document.querySelector("#register_username").value = "";
    document.querySelector("#register_password").value = "";

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 201) {
            alert("Success, login");
        } else {
            alert("Unsuccessful :(")
        }
    }
    catch(error) {
        console.log(error);
    }
}

async function logoutUser() {
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
            showLogin();
        } else {
            alert("Error with logging out, try again.");
        }
    } catch(error) {
        console.log(error);
    }
}

async function addTodoListItem(event) {
    event.preventDefault();

    const title = document.querySelector("#add_todo_title").value;
    const description = document.querySelector("#add_todo_description").value;

    // Clear values from inputs
    document.querySelector("#add_todo_title").value = "";
    document.querySelector("#add_todo_description").value = "";

    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify({ title, description })
        });

        if (response.status === 201) {
            fetchAndRenderTodos();
        } else {
            alert("Failed to create todo list item");
        }
    } catch(error) {
        console.log(error);
    }
}

async function fetchAndRenderTodos() {
    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`,
            }
        });

        if (response.status === 200) {
            const todos = await response.json();

            // Get container and then remove all content
            const todoListContainer = document.querySelector("#todo_list_container");
            todoListContainer.innerHTML = '';

            todos.forEach(todo => {
                // Create list item which will hold children with data
                const listItem = document.createElement("li");

                // Checkbox for completion
                const checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                if (todo.completed === true) {
                    checkBox.checked = true;
                    listItem.style.textDecoration = "line-through";
                }
                checkBox.addEventListener("change", () => {
                    toggleTodoListCompletion(todo.id, todo.completed);
                });
                listItem.appendChild(checkBox);

                // Section which will contain text data
                const paragraphSection = document.createElement("section");
                paragraphSection.classList.add("todo_list_item_paragraph_section");

                // Text that contains data for item
                const paragraph = document.createElement('p');
                paragraph.textContent = `${todo.title}: ${todo.description}`;
                // Append paragraph to paragraph section, then paragraph section to listItem
                paragraphSection.appendChild(paragraph);
                listItem.appendChild(paragraphSection);

                // Section that will contain buttons
                const buttonSection = document.createElement("section");
                buttonSection.classList.add('todo_list_item_button_section')

                // Create button to delete
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("delete_button");
                deleteButton.addEventListener("click", () => {
                    deleteTodoListItem(todo.id);
                });
                buttonSection.appendChild(deleteButton);

                // Create button to edit
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.classList.add("edit_button");
                editButton.addEventListener("click", () => {
                    currentlyViewedItemId = todo.id;
                    showEditItem();
                });
                buttonSection.appendChild(editButton);

                listItem.appendChild(buttonSection);

                todoListContainer.appendChild(listItem);
            });
        } else {
            alert("Failed to fetch todos");
        }
    } catch(error) {
        console.log(error);
    }
}

async function deleteTodoListItem(id) {
    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`,
            },
        });

        if (response.status === 204) {
            // If successful, update todo list
            fetchAndRenderTodos();
        } else {
            alert("Failed to delete item");
        }
    } catch(error) {
        console.log(error);
    }
}

async function editTodoListItem(event) {
    event.preventDefault();

    const title = document.querySelector("#edit_todo_list_title").value;
    const description = document.querySelector("#edit_todo_list_description").value;

    // Clear values from inputs
    document.querySelector("#edit_todo_list_title").value = "";
    document.querySelector("#edit_todo_list_description").value = "";
    
    try {
        const response = await fetch(`${API_URL}/todos/${currentlyViewedItemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify({ title, description }),
        });

        if (response.status === 200) {
            currentlyViewedItemId = null;
            closeOverlay();
            fetchAndRenderTodos();
        } else {
            alert("Failed to edit item");
        }
    } catch(error) {
        console.log(error);
    }
}

async function toggleTodoListCompletion(id, completedStatus) {
    // If current completed status is true, then turn updated completed status
    // to false, and vice versa
    completed = !completedStatus;

    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthToken()}`,
            },
            body: JSON.stringify({ completed }),
        });

        if (response.status === 200) {
            fetchAndRenderTodos();
        } else {
            alert("Failed to toggle completion");
        }
    } catch(error) {
        console.log(error);
    }
}

function getAuthToken() {
    const cookies = document.cookie.split('; ');
    // Find authToken among all cookies on website
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === "authToken") {
            return cookieValue;
        }
    }
    // if no authToken found return nothing
    return null;
}

function showApp() {
    document.querySelector("#login_register_container").classList.add("hide");
    document.querySelector("#todo_app_container").classList.remove("hide");
    fetchAndRenderTodos();
}

function showLogin() {
    document.querySelector("#login_register_container").classList.remove("hide");
    document.querySelector("#todo_app_container").classList.add("hide");
}

function showEditItem() {
    document.querySelector("#todo_list_item_edit").classList.remove("hide");
}

function closeOverlay() {
    document.querySelector("#todo_list_item_edit").classList.add("hide");
}

  return (
    <>
      <section id="login_register_container" className="">
          <LoginForm></LoginForm>
          <h1>Register</h1>
          <form onSubmit={registerUser} id="register_form" className="">
              <section className="form_group">
                  <label htmlFor="register_username">Username:</label>
                  <input name="username" type="text" id="register_username" required />
              </section>
              <section className="form_group">
                  <label htmlFor="register_password">Password:</label>
                  <input name="password" type="password" id="register_password" required />
              </section>
              <section className="submit_button_container">
                  <button type="submit">Register</button>
              </section>
          </form>
      </section>
      <section id="todo_app_container" className="hide container">
          <button onClick={logoutUser}>Logout</button>
          <section className="form_container">
              <h3>Todo List</h3>
              <form onSubmit={addTodoListItem} id="add_todo_form">
                  <section className="form_group">
                      <label htmlFor="add_todo_title">Title:</label>
                      <input name="title" type="text" id="add_todo_title" required />
                  </section>
                  <section className="form_group">
                      <label htmlFor="add_todo_description">Description:</label>
                      <input name="description" type="text" id="add_todo_description" required />
                  </section>
                  <section className="submit_button_container">
                      <button className="submit_button" type="submit">Add Todo</button>
                  </section>
              </form>
              <ul id="todo_list_container">

              </ul>
          </section>
      </section>
      <section id="todo_list_item_edit" className="hide overlay">
          <button onClick={closeOverlay}>Back</button>
          <section>
              <h3>Edit item</h3>
              <form onSubmit={editTodoListItem} id="edit_todo_list_item">
                  <section className="form_group">
                      <label htmlFor="edit_todo_list_title">Title:</label>
                      <input type="text" name="title" id="edit_todo_list_title" />
                  </section>
                  <section className="form_group">
                      <label htmlFor="edit_todo_list_description">Description:</label>
                      <input type="text" name="descirption" id="edit_todo_list_description" />
                  </section>
                  <section className="submit_button_container">
                      <button type="submit">Submit</button>
                  </section>
              </form>
          </section>
      </section>
    </>
  )
}

export default App
