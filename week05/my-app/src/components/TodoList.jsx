import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import EditTodoListItem from "./EditTodoListItem"

function TodoList({ onAddTodo, onLogoutUser, API_URL, authToken }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    // Add todo list item functionality
    const addTodoListItem = async (title, description) => {
        try {
            const response = await fetch(`${API_URL}/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
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

    // Delete todo list item functionality
    const deleteTodoListItem = async (id) => {
        try {
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
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

    // Editing functionality
    const handleEditItem = async (id, title, description) => {
        try {
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
                body: JSON.stringify({ title, description }),
            });

            if (response.status === 200) {
                console.log("success")
                fetchAndRenderTodos();
            } else {
                alert("Failed to edit item");
            }
        } catch(error) {
            console.log(error);
        }
    }

    // Checkbox functionality
    const toggleTodoListCompletion = async (id, completedStatus) => {
        // If current completed status is true, then turn updated completed status
        // to false, and vice versa
        const completed = !completedStatus;

        try {
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
                body: JSON.stringify({ completed }),
            });

            if (response.status === 200) {
                console.log("Success! Completion status changed!")
                fetchAndRenderTodos();
            } else {
                alert("Failed to toggle completion");
            }
        } catch(error) {
            console.log(error);
        }
    }
    
    // Logout functionality
    const logoutUser = async () => {
        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
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

    const fetchAndRenderTodos = async () => {
        try {
            const response = await fetch(`${API_URL}/todos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }
            });

            if (response.status === 200) {
                const todos = await response.json();

                setTodoList(todos);

                // // Get container and then remove all content
                // const todoListContainer = document.querySelector("#todo_list_container");
                // todoListContainer.innerHTML = '';

                // todos.forEach(todo => {
                //     // Create list item which will hold children with data
                //     const listItem = document.createElement("li");

                //     // Checkbox for completion
                //     const checkBox = document.createElement("input");
                //     checkBox.type = "checkbox";
                //     if (todo.completed === true) {
                //         checkBox.checked = true;
                //         listItem.style.textDecoration = "line-through";
                //     }
                //     checkBox.addEventListener("change", () => {
                //         toggleTodoListCompletion(todo.id, todo.completed);
                //     });
                //     listItem.appendChild(checkBox);

                //     // Section which will contain text data
                //     const paragraphSection = document.createElement("section");
                //     paragraphSection.classList.add("todo_list_item_paragraph_section");

                //     // Text that contains data for item
                //     const paragraph = document.createElement('p');
                //     paragraph.textContent = `${todo.title}: ${todo.description}`;
                //     // Append paragraph to paragraph section, then paragraph section to listItem
                //     paragraphSection.appendChild(paragraph);
                //     listItem.appendChild(paragraphSection);

                //     // Section that will contain buttons
                //     const buttonSection = document.createElement("section");
                //     buttonSection.classList.add('todo_list_item_button_section')

                //     // Create button to delete
                //     const deleteButton = document.createElement("button");
                //     deleteButton.textContent = "Delete";
                //     deleteButton.classList.add("delete_button");
                //     deleteButton.addEventListener("click", () => {
                //         deleteTodoListItem(todo.id);
                //     });
                //     buttonSection.appendChild(deleteButton);

                //     // Create button to edit
                //     const editButton = document.createElement("button");
                //     editButton.textContent = "Edit";
                //     editButton.classList.add("edit_button");
                //     editButton.addEventListener("click", () => {
                //         currentlyViewedItemId = todo.id;
                //         showEditItem();
                //     });
                //     buttonSection.appendChild(editButton);

                //     listItem.appendChild(buttonSection);

                //     todoListContainer.appendChild(listItem);
                // });
            } else {
                alert("Failed to fetch todos");
            }
        } catch(error) {
            console.log(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addTodoListItem(title, description);
        setTitle('');
        setDescription('');
    }

    useEffect(() => {
        fetchAndRenderTodos();
    }, []);

    return (
        <>
            <section id="todo_app_container" className="container">
            <button onClick={logoutUser}>Logout</button>
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
                    {todoList.map((item) => (
                        <ListItem 
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            completionStatus={item.completed}
                            onDelete={deleteTodoListItem}
                            onToggleCompletion={toggleTodoListCompletion}
                            onEdit={() => setEditingItem(item)}
                        />
                    ))}
                </ul>
            </section>
            </section>
            {editingItem && (
                <EditTodoListItem
                    item={editingItem}
                    onEditItem={handleEditItem} 
                    onCloseOverlay={() => setEditingItem(null)} 
                />
            )}
        </>
    )
}

export default TodoList;