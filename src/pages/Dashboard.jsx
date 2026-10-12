import React from "react";
function Dashboard({ books, users, transactions }) {
  const totalCopies = books.reduce((sum, book) => sum + book.quantity, 0);
  const lowStock = books.filter((book) => book.quantity < 2);

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of the community library.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Titles</span>
          <strong>{books.length}</strong>
        </div>

        <div className="stat-card">
          <span>Total Copies</span>
          <strong>{totalCopies}</strong>
        </div>

        <div className="stat-card">
          <span>Users</span>
          <strong>{users.length}</strong>
        </div>

        <div className="stat-card">
          <span>Transactions</span>
          <strong>{transactions.length}</strong>
        </div>
      </div>

      <section className="content-card">
        <div className="section-title">
          <h2>Current Book Availability</h2>
          <span className="small-text">{books.length} titles</span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>ISBN</th>
                <th>Available</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book.id} className={book.quantity < 2 ? "low-stock" : ""}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.isbn}</td>
                  <td>
                    <span className="quantity-badge">
                      {book.quantity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {lowStock.length > 0 && (
          <div className="warning-box">
            <strong>Low stock:</strong> {lowStock.length} book(s) have fewer than
            2 copies available.
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;