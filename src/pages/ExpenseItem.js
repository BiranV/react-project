export default function ExpenseItem({ expense, handleEdit, handleDelete }) {
    const { id, title, amount } = expense;
    
    return (
        <div className="expense-line">
            <div className="span-amount">  ${amount}  </div>
            <div> {title} </div>
            <div className="expense-buttons">
                <button
                    className="edit"
                    aria-label="edit button"
                    onClick={() => handleEdit(id)}
                >
                    Edit
                </button>
                <button
                    className="delete"
                    aria-label="delete button"
                    onClick={() => handleDelete(id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
