import ExpenseItem from "./ExpenseItem";
import Snackbar from "../components/Snackbar";
import { useState, useEffect } from "react";
import { db } from "../firebase.config";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";

function App() {
  useEffect(() => {
    onSnapshot(collection(db, "budget"), (snapshot) => {
      setExpenses(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  const [expenses, setExpenses] = useState([]);
  const [snackbarActive, setSnackbarActive] = useState({
    show: false,
    text: "",
  });

  const handleSnackbar = (val) => {
    setSnackbarActive({ show: true, text: val });
    setTimeout(() => {
      setSnackbarActive({ show: false, text: "" });
    }, 2000);
  };

  const [form, setForm] = useState({
    title: "",
    amount: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleEdit = (id) => {
    [...expenses].forEach((expense, key) => {
      if (expense.id === id) {
        setForm({ ...expense });
        setEditMode(true);
      }
    });
  };
  const handleDelete = (id) => {
    [...expenses].forEach((expense, key) => {
      if (expense.id === id) {
        deleteDoc(doc(db, "budget", id));
        handleSnackbar("deleted");
        setForm({
          title: "",
          amount: "",
        });
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) {
      alert("Please fill out all fields");
      return;
    } else {
      if (editMode === false) {
        addDoc(collection(db, "budget"), form);
        handleSnackbar("added");
      } else {
        updateDoc(doc(db, "budget", form.id), form);
        handleSnackbar("edited");
      }
      setForm({
        title: "",
        amount: "",
      });
      setEditMode(false);
    }
  };

  return (
    <div className="app-expenses">
      <div className="title-page">
        <h1>Expenses Calculator</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="expenses-inputs">
          <input
            type="text"
            maxLength="30"
            value={form.title}
            placeholder="Title"
            onChange={(e) => {
              setForm({ ...form, title: e.target.value });
            }}
          />
          <input
            type="number"
            maxLength="1000000"
            value={form.amount}
            placeholder="Amount"
            min="0"
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
          />
        </div>
        <div className="expenses-buttons">

          <button type="submit" className="submit">
            {!editMode ? "Submit" : "Save"}
          </button>
        </div>
      </form>
      <ul>
        {expenses.map((expense, key) => (
          <li key={key}><ExpenseItem
            key={key}
            expense={expense}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          /></li>
        ))}
      </ul>
      <div className="total-amount">
        <h2>
          Total Amount: {" "}
          <span>
            $
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount);
            }, 0)}
          </span>
        </h2>
      </div>
      {snackbarActive.show && <Snackbar text={snackbarActive.text} />}
    </div>
  );
}

export default App;