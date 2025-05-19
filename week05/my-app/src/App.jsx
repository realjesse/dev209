import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TodoList from './components/TodoList';
import EditTodoListItem from './components/EditTodoListItem';

function App() {
    // Global variables and states
    const API_URL = "http://localhost:3000"
    let currentlyViewedItemId = null;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    window.onload = () => {
        if (getAuthToken()) {
            showApp();
        }
    }

    async function registerUser(username, password) {
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

    async function addTodoListItem(title, description) {
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

    async function editTodoListItem(title, description) {
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

    function showEditItem() {
        document.querySelector("#todo_list_item_edit").classList.remove("hide");
    }

    function closeOverlay() {
        document.querySelector("#todo_list_item_edit").classList.add("hide");
    }

  return (
    <>
        {!isLoggedIn ? (
            <section id="login_register_container">
                <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} API_URL={API_URL} />
                <RegisterForm onRegister={registerUser} />
            </section>
        ) : (
            <>
                <TodoList onAddTodo={addTodoListItem} onLogoutUser={logoutUser} />
                <EditTodoListItem onEditItem={editTodoListItem} onCloseOverlay={closeOverlay} />
            </>
        )}
    </>
  )
}

export default App
