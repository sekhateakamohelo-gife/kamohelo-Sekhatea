import React from "react";
import { useState } from "react";

const emptyBook = {
  title: "",
  author: "",
  genre: "",
  isbn: "",
  quantity: 1
};

function Books({ books, onAdd, onUpdate, onDelete }) {
  const [form, setForm] = useState(emptyBook);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: name === "quantity" ? Number(value) : value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title || !form.author || !form.genre || !form.isbn) {
      setMessage("Please fill in all book fields.");
      return;
    }

    if (form.quantity < 0) {
      setMessage("Quantity cannot be negative.");
      return;
    }

    if (editingId) {
      onUpdate({ ...form, id: editingId });
      setMessage("Book updated successfully.");
    } else {
      onAdd(form);
      setMessage("Book added successfully.");
    }

    setForm(emptyBook);
    setEditingId(null);
  }

  function editBook(book) {
    setForm(book);
    setEditingId(book.id);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setForm(emptyBook);
    setEditingId(null);
    setMessage("");
  }

  function removeBook(id) {
    if (window.confirm("Delete this book?")) {
      onDelete(id);
    }
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Book Management</h1>
          <p>Add, update and delete books.</p>
        </div>
      </div>

      <section className="content-card">
        <h2>{editingId ? "Update Book" : "Add New Book"}</h2>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} />
          </div>

          <div>
            <label>Author</label>
            <input name="author" value={form.author} onChange={handleChange} />
          </div>

          <div>
            <label>Genre</label>
            <input name="genre" value={form.genre} onChange={handleChange} />
          </div>

          <div>
            <label>ISBN</label>
            <input name="isbn" value={form.isbn} onChange={handleChange} />
          </div>

          <div>
            <label>Initial Quantity</label>
            <input
              type="number"
              min="0"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="form-buttons">
            <button className="primary-button" type="submit">
              {editingId ? "Update Book" : "Add Book"}
            </button>

            {editingId && (
              <button className="secondary-button" type="button" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {message && <p className="success">{message}</p>}
      </section>

      <section className="content-card">
        <div className="section-title">
          <h2>Book List</h2>
          <span className="small-text">{books.length} books</span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>ISBN</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.isbn}</td>
                  <td>{book.quantity}</td>
                  <td className="actions">
                    <button className="edit-button" onClick={() => editBook(book)}>
                      Update
                    </button>
                    <button className="delete-button" onClick={() => removeBook(book.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Books;