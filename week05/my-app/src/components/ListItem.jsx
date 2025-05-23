

function ListItem({ id, title, description, onDelete, onEdit, onToggleCompletion, completionStatus, item }) {

    return (
        <li>
            <input 
                type="checkbox"
                checked={completionStatus} 
                onChange={() => onToggleCompletion(id, completionStatus)} 
            />
            <section className="todo_list_item_paragraph_section">
                <p className={completionStatus ? "completed": ""}>
                    {title}: {description}
                </p>
            </section>
            <section className="todo_list_item_button_section">
                <button className="delete_button" onClick={() => onDelete(id)}>Delete</button>
                <button className="edit_button" onClick={() => onEdit(item)}>Edit</button>
            </section>
        </li>
    )
}

export default ListItem;