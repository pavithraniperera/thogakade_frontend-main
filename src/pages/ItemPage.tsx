import React, {useEffect, useState} from "react"
import { Trash, Trash2 } from "react-feather"
import {deletedItem, fetchItems, saveItem, updatedItem} from "../reducers/ItemSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {Item} from "../assets/Model/Item.ts";



function ItemPage() {
  // const [items, setItems] = useState([
  //   { item_id: "I001", name: "Arduino Board", quantity: 10, price: 20.5 },
  //   { item_id: "I002", name: "Raspberry Pi", quantity: 5, price: 35.0 }
  // ])

  const [itemId, setItemId] = useState("")
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const items = useSelector(state => state.item.items)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch])

  const handleAdd = () => {
    if (!itemId || !name || !quantity || !price) {
      alert("All fields are required!");
      return;
    }


    const newItem = {
      itemId,
      name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };


    dispatch(saveItem(newItem));

    resetForm();
  };


  const handleEdit = (item: any) => {
    setItemId(item.ItemID)
    setName(item.Name)
    setQuantity(item.Quantity)
    setPrice(item.Price)
    setIsEditing(true)
  }

  const handleUpdate = () => {
    if (!itemId || !name || !quantity || !price) {
      alert("All fields are required!");
      return;
    }

    const updateItem = new Item(itemId,name,quantity,price)

    dispatch(updatedItem(updateItem));


    resetForm();

  };


  const handleDelete = (itemId: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {

      dispatch(deletedItem(itemId));
    }
  };


  const resetForm = () => {
    setItemId("")
    setName("")
    setQuantity("")
    setPrice("")
    setIsEditing(false)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="item_id"
          placeholder="Item ID"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
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
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
            <th className="border px-4 py-2">Item ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.item_id}
              onClick={() => handleEdit(item)}
              className="hover:cursor-pointer hover:bg-slate-600 hover:text-white"
            >
              <td className="border px-4 py-2">{item.ItemID}</td>
              <td className="border px-4 py-2">{item.Name}</td>
              <td className="border px-4 py-2">{item.Quantity}</td>
              <td className="border px-4 py-2">{item.Price}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(item.ItemID)
                  }}
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

export default ItemPage
