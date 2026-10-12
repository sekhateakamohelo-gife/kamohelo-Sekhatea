import React from "react";
import { useState } from "react";

const emptyUser = {
  name: "",
  membershipId: "",
  role: "Member"
};

function Users({ users, onAdd, onUpdate, onDelete, currentUser }) {
  const [form, setForm] = useState(emptyUser);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const isAdmin = currentUser.role === "Admin";

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name || !form.membershipId || !form.role) {
      setMessage("Please fill in all user fields.");
      return;
    }

    const duplicate = users.some(
      (user) =>
        user.membershipId.toLowerCase() === form.membershipId.toLowerCase() &&
        user.id !== editingId
    );

    if (duplicate) {
      setMessage("That membership ID already exists.");
      return;
    }

    if (editingId) {
      onUpdate({ ...form, id: editingId });
      setMessage("User updated successfully.");
    } else {
      onAdd(form);
      setMessage("User added successfully.");
    }

    setForm(emptyUser);
    setEditingId(null);
  }

  function editUser(user) {
    setForm(user);
    setEditingId(user.id);
    setMessage("");
  }

  function deleteUser(id) {
    if (id === currentUser.id) {
      setMessage("You cannot delete the account currently logged in.");
      return;
    }

    if (window.confirm("Delete this user?")) {
      onDelete(id);
      setMessage("User deleted.");
    }
  }

  if (!isAdmin) {
    return (
      <div>
        <div className="page-heading">
          <div>
            <h1>User Management</h1>
            <p>Manage library users.</p>
          </div>
        </div>

        <section className="content-card">
          <div className="warning-box">
            Only an administrator can manage user accounts.
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>User Management</h1>
          <p>Admin area for adding, updating and deleting users.</p>
        </div>
      </div>

      <section className="content-card">
        <h2>{editingId ? "Update User" : "Add New User"}</h2>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div>
            <label>Membership ID</label>
            <input
              name="membershipId"
              value={form.membershipId}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="form-buttons">
            <button className="primary-button" type="submit">
              {editingId ? "Update User" : "Add User"}
            </button>

            {editingId && (
              <button
                className="secondary-button"
                type="button"
                onClick={() => {
                  setForm(emptyUser);
                  setEditingId(null);
                  setMessage("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {message && <p className="success">{message}</p>}
      </section>

      <section className="content-card">
        <div className="section-title">
          <h2>User List</h2>
          <span className="small-text">{users.length} users</span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Membership ID</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.membershipId}</td>
                  <td>{user.role}</td>
                  <td className="actions">
                    <button className="edit-button" onClick={() => editUser(user)}>
                      Update
                    </button>
                    <button className="delete-button" onClick={() => deleteUser(user.id)}>
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

export default Users;