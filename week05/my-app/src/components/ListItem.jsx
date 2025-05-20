

function ListItem({ id, title, description, onDelete, onEdit, onToggleCompletion, completionStatus }) {

    return (
        <li>
            <input type="checkbox" onClick={() => onToggleCompletion(id, completionStatus)}></input>
            <section className="todo_list_item_paragraph_section">
                <p>{title}: {description}</p>
            </section>
            <section className="todo_list_item_button_section">
                <button className="delete_button" onClick={() => onDelete(id)}>Delete</button>
                <button className="edit_button" onClick={onEdit}>Edit</button>
            </section>
        </li>
    )
}

export default ListItem;