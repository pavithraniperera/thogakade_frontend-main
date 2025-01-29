import React, {useEffect, useState} from "react"
import { Trash2 } from "react-feather"
import {useDispatch, useSelector} from "react-redux";
import {deletedCustomer, fetchCustomers, saveCustomer, updatedCustomer} from "../reducers/CustomerSlice.ts";
import {Customer} from "../assets/Model/Customer.ts";

function CustomerPage() {
  // const [customers, setCustomers] = useState([
  //   {
  //     id: "C001",
  //     name: "John Doe",
  //     nic: "123456789V",
  //     email: "john@example.com",
  //     phone: "1234567890"
  //   },
  //   {
  //     id: "C002",
  //     name: "Jane Smith",
  //     nic: "987654321X",
  //     email: "jane@example.com",
  //     phone: "0987654321"
  //   }
  // ])

  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const customers = useSelector((state) => state.customer.customers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch])

  const handleAdd = () => {
    if (!name || !address || !email ) {
      alert("All fields are required!");
      return;
    }

    // Create a new customer object
    const newCustomer: Customer = new Customer("", name, address, email);

    // Dispatch the saveCustomer thunk
    dispatch(saveCustomer(newCustomer));
    console.log(customers);

    // Reset the form fields after dispatching
    resetForm();
  };


  const handleEdit = (customer: any) => {
    setId(customer.CustomerID)
    setName(customer.Name)
    setAddress(customer.Address)
    setEmail(customer.Email)
    setIsEditing(true)
  }

  const handleUpdate = () => {
    if (!id || !name || !address || !email ) {
      alert("All fields are required!");
      return;
    }

    const updatedCustomerObj: Customer = new Customer(id, name, address, email);


    dispatch(updatedCustomer(updatedCustomerObj));
    console.log(customers);


    resetForm();
  };


  const handleDelete = (customerId: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {

      dispatch(deletedCustomer({ CustomerID: customerId } as Customer));
    }
  };


  const resetForm = () => {
    setId("")
    setName("")
    setAddress("")
    setEmail("")
    setIsEditing(false)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

      </div>
      <div className="flex justify-end">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white p-2 rounded mr-2"
          >
            Add
          </button>
        )}
        {isEditing && (
          <button
            onClick={resetForm}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
      <table className="min-w-full table-auto border-collapse mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Email</th>

            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              onClick={() => handleEdit(customer)}
              className="hover:cursor-pointer hover:bg-slate-600 hover:text-white"
            >
              <td className="border px-4 py-2">{customer.CustomerID}</td>
              <td className="border px-4 py-2">{customer.Name}</td>
              <td className="border px-4 py-2">{customer.Address}</td>
              <td className="border px-4 py-2">{customer.Email}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(customer.CustomerID)}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerPage
