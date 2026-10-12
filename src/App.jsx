import React from 'react';
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";

const startingBooks = [
  {
    id: 1,
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    genre: "Fiction",
    isbn: "9780385474542",
    quantity: 3
  },
  {
    id: 2,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Adventure",
    isbn: "9780062315007",
    quantity: 2
  },
  {
    id: 3,
    title: "Introduction to Computing",
    author: "John Smith",
    genre: "Education",
    isbn: "9781234567890",
    quantity: 1
  }
];

const startingUsers = [
  { id: 1, name: "Library Admin", membershipId: "ADMIN001", role: "Admin" },
  { id: 2, name: "Mpho Student", membershipId: "MEM001", role: "Member" }
];

function App() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("libraryBooks");
    return saved ? JSON.parse(saved) : startingBooks;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("libraryUsers");
    return saved ? JSON.parse(saved) : startingUsers;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("libraryTransactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const saved = localStorage.getItem("libraryLoggedInUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("libraryBooks", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("libraryUsers", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("libraryTransactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("libraryLoggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("libraryLoggedInUser");
    }
  }, [loggedInUser]);

  function addBook(book) {
    setBooks([...books, { ...book, id: Date.now() }]);
  }

  function updateBook(updatedBook) {
    setBooks(
      books.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      )
    );
  }

  function deleteBook(id) {
    setBooks(books.filter((book) => book.id !== id));
  }

  function changeStock(bookId, amount, type) {
    setBooks(
      books.map((book) => {
        if (book.id !== bookId) return book;

        const newQuantity = book.quantity + amount;

        if (newQuantity < 0) return book;

        return { ...book, quantity: newQuantity };
      })
    );

    const book = books.find((item) => item.id === bookId);

    if (book) {
      setTransactions([
        ...transactions,
        {
          id: Date.now(),
          bookTitle: book.title,
          type,
          amount: Math.abs(amount),
          date: new Date().toLocaleString()
        }
      ]);
    }
  }

  function addUser(user) {
    setUsers([...users, { ...user, id: Date.now() }]);
  }

  function updateUser(updatedUser) {
    setUsers(
      users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  }

  function deleteUser(id) {
    setUsers(users.filter((user) => user.id !== id));
  }

  function login(membershipId) {
    const user = users.find(
      (item) =>
        item.membershipId.toLowerCase() === membershipId.trim().toLowerCase()
    );

    if (user) {
      setLoggedInUser(user);
      return true;
    }

    return false;
  }

  function logout() {
    setLoggedInUser(null);
  }

  if (!loggedInUser) {
    return <Login onLogin={login} />;
  }

  return (
    <>
      <Navbar user={loggedInUser} onLogout={logout} />

      <main className="page-container">
        <Routes>
          <Route
            path="/"
            element={<Dashboard books={books} users={users} transactions={transactions} />}
          />
          <Route
            path="/books"
            element={
              <Books
                books={books}
                onAdd={addBook}
                onUpdate={updateBook}
                onDelete={deleteBook}
              />
            }
          />
          <Route
            path="/transactions"
            element={
              <Transactions
                books={books}
                transactions={transactions}
                onStockChange={changeStock}
              />
            }
          />
          <Route
            path="/users"
            element={
              <Users
                users={users}
                onAdd={addUser}
                onUpdate={updateUser}
                onDelete={deleteUser}
                currentUser={loggedInUser}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;