import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css"

function Home() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, [page, size, sort]);

  const token = localStorage.getItem("authToken");

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await fetch(
        `http://localhost:3000/api/customers/private/ListOfCustomer?page=${page}&size=${size}&sort=${sort}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching customers");
      }

      const data = await response.json();
      setCustomers(data.content);
    } catch (error) {
      setError(error.message); // Set error message to display
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/customers/private/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting customer");
      }

      fetchCustomers();
    } catch (error) {
      setError(error.message); // Set error message to display
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };
  const handleOnClickAddUser = () =>{
    navigate("/creatCustomer");
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h2>Customer List</h2>
      <div className="subContainer">
        <label className="lbl">
          <button className="topbtn" onClick={handleOnClickAddUser}>
            ADD Customer
          </button>
        </label>
        <div className="filter-container">
          <label className="sort" htmlFor="filter">
            Sort by:
          </label>
          <select
            id="filter"
            className="filter-dropdown"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="firstName">First Name</option>
            <option value="id">ID</option>
            <option value="city">City</option>
          </select>
        </div>
      </div>
      <table className="tableData">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.city}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td className="btn">
                  <button
                    className="delete"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="update"
                    onClick={() => handleUpdate(customer.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No customers found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="below">
        <button
          className="bottombtn"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          className="bottombtn"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
