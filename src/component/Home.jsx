import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import debounce from "lodash.debounce";

function Home() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState("id");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  console.log("token>>>>>",token)
  const fetchCustomers = useCallback(
    debounce(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          // "http://localhost:3000/api/customers/private/ListOfCustomer?search=Chandan&sort=firstName&size=11&page=0",
          `http://localhost:3000/api/customers/public/ListOfCustomer?search=${search}&page=${page}&size=${size}&sort=${sort}`,
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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, 300),
    [search, page, size, sort, token]
  );

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/customers/public/${id}`,
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
      setError(error.message);
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleOnClickAddUser = () => {
    navigate("/creatCustomer");
  };

  const handleScnc = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/customers/public/userList",
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
      console.log(">>>>>>>", await response.json());
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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
        <div className="search">
          <input
            className="search"
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearch}
          />
          <button className="search-btn" onClick={fetchCustomers}>
            Search
          </button>
        </div>
        <div>
          <button className="sync" onClick={handleScnc}>
            Sync
          </button>
        </div>
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
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
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
