

function ListItem({ id, title, description, onDelete }) {

    // async function editTodoListItem(title, description) {
    //     try {
    //         const response = await fetch(`${API_URL}/todos/${currentlyViewedItemId}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${authToken}`,
    //             },
    //             body: JSON.stringify({ title, description }),
    //         });

    //         if (response.status === 200) {
    //             currentlyViewedItemId = null;
    //             closeOverlay();
    //             fetchAndRenderTodos();
    //         } else {
    //             alert("Failed to edit item");
    //         }
    //     } catch(error) {
    //         console.log(error);
    //     }
    // }

    // async function toggleTodoListCompletion(id, completedStatus) {
    //     // If current completed status is true, then turn updated completed status
    //     // to false, and vice versa
    //     completed = !completedStatus;

    //     try {
    //         const response = await fetch(`${API_URL}/todos/${id}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${authToken}`,
    //             },
    //             body: JSON.stringify({ completed }),
    //         });

    //         if (response.status === 200) {
    //             fetchAndRenderTodos();
    //         } else {
    //             alert("Failed to toggle completion");
    //         }
    //     } catch(error) {
    //         console.log(error);
    //     }
    // }

    return (
        <li>
            <input type="checkbox"></input>
            <section className="todo_list_item_paragraph_section">
                <p>{title}: {description}</p>
            </section>
            <section className="todo_list_item_button_section">
                <button className="delete_button" onClick={() => onDelete(id)}>Delete</button>
                <button className="edit_button">Edit</button>
            </section>
        </li>
    )
}

export default ListItem;