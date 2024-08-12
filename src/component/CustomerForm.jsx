import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
 

function CustomerForm( ) {
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
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
      }else{
        console.log("Customer saved successfully");
        navigate("/home");
      }

       
      setCustomer({
        firstName: "",
        lastName: "",
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
    <form onSubmit={handleSubmit}>
      <h2>Add Customer</h2>
      <input
        name="firstName"
        value={customer.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        name="lastName"
        value={customer.lastName}
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
  );
}

export default CustomerForm;
