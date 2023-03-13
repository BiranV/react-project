export default function ExpenseItem({ expense, handleEdit, handleDelete }) {
    const { id, title, amount } = expense;

    return (
        <div className="expense-line">
            <div className="amount">  ${amount}  </div>
            <div> {title} </div>
            <div className="expense-buttons">
                <button
                    className="orange-btn"
                    aria-label="edit button"
                    onClick={() => handleEdit(id)}
                >
                    Edit
                </button>
                <button
                    className="red-btn"
                    aria-label="delete button"
                    onClick={() => handleDelete(id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
