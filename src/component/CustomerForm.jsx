import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CreateCustomer.css"; // Import the CSS file

function CustomerForm() {
  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    street: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/customers/public/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save customer");
      } else {
        console.log("Customer saved successfully");
        navigate("/home");
      }

      // Clear form fields
      setCustomer({
        first_name: "",
        last_name: "",
        street: "",
        address: "",
        city: "",
        state: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="first_name"
          value={customer.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          name="last_name"
          value={customer.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          name="street"
          value={customer.street}
          onChange={handleChange}
          placeholder="Street"
        />
        <input
          name="address"
          value={customer.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          name="city"
          value={customer.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          name="state"
          value={customer.state}
          onChange={handleChange}
          placeholder="State"
        />
        <input
          name="email"
          type="email"
          value={customer.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CustomerForm;
