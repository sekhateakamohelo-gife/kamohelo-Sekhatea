import React from "react";
import { useState } from "react";

function Transactions({ books, transactions, onStockChange }) {
  const [selectedBook, setSelectedBook] = useState("");
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("");

  function handleTransaction(type) {
    const book = books.find((item) => item.id === Number(selectedBook));

    if (!book) {
      setMessage("Please select a book.");
      return;
    }

    if (amount < 1) {
      setMessage("Amount must be at least 1.");
      return;
    }

    if (type === "Borrowed" && book.quantity < amount) {
      setMessage("There are not enough copies available.");
      return;
    }

    const change = type === "Added Stock" ? amount : -amount;
    onStockChange(book.id, change, type);

    setMessage(
      type === "Added Stock"
        ? `${amount} copy/copies added to ${book.title}.`
        : `${amount} copy/copies borrowed from ${book.title}.`
    );

    setAmount(1);
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Transactions</h1>
          <p>Add stock when books arrive or deduct stock when books are borrowed.</p>
        </div>
      </div>

      <section className="content-card">
        <h2>Record Transaction</h2>

        <div className="transaction-form">
          <div>
            <label>Book</label>
            <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)}>
              <option value="">Select a book</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} ({book.quantity} available)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          <div className="transaction-buttons">
            <button className="primary-button" onClick={() => handleTransaction("Added Stock")}>
              Add Stock
            </button>
            <button className="borrow-button" onClick={() => handleTransaction("Borrowed")}>
              Borrow Book
            </button>
          </div>
        </div>

        {message && <p className="success">{message}</p>}
      </section>

      <section className="content-card">
        <div className="section-title">
          <h2>Transaction History</h2>
          <span className="small-text">{transactions.length} transactions</span>
        </div>

        {transactions.length === 0 ? (
          <p className="empty-message">No transactions recorded yet.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Transaction</th>
                  <th>Quantity</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {[...transactions].reverse().map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.bookTitle}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Transactions;