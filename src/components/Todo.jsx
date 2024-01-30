"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const Todo = ({ item, categories }) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [isDone, setIsDone] = useState(item.isdone === "true");
  const [selectedCategory, setSelectedCategory] = useState(
    item.categories || ""
  );
  const [dataState, setDataState] = useState([]);

  async function handleDelete() {
    const res = await fetch("https://v1.appbackend.io/v1/rows/iupF0TppPECf", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([item._id]),
    });
    const data = await res.json();
    console.log(data);
    router.refresh();
    toast.success("Berhasil dihapus");
  }

  async function handleUpdate() {

    const res = await fetch("https://v1.appbackend.io/v1/rows/iupF0TppPECf", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: item._id,
        title,
        isdone: isDone.toString(),
        categories: selectedCategory,
      }),
    });  

    const data = await res.json();
    console.log(data);
    router.refresh();
    setEditMode(false);
    router.refresh();
    toast.success("Berhasil diupdate");
  }

  if (editMode) {
    return (
      <main className="space-y-2 bg-gray-100 p-4 rounded-md">
        <h3 className="text-xl font-bold mb-4">Edit Todo</h3>
        {/* title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            className="border p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* categories */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Category
          </label>
          <select
            className="border p-2 w-full text-base"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* is done */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isDone}
              onChange={() => setIsDone(!isDone)}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-600">Is Done</span>
          </label>
        </div>

        {/* update */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={handleUpdate}
        >
          Update
        </button>
      </main>
    );
  }

  const getCategoryColor = (category) => {
    if (!category) {
      return "";
    }
    switch (category.toLowerCase()) {
      case "health":
        return "pb-2 pt-2 pl-4 pr-4 bg-red-500 rounded-full w-full text-white";
      case "work":
        return "bg-blue-500 pb-2 pt-2 pl-4 pr-4 rounded-full w-full text-white";
      case "school":
        return "bg-green-500 pb-2 pt-2 pl-4 pr-4 rounded-full w-full text-white";
      case "daily":
        return "bg-teal-500 pb-2 pt-2 pl-4 pr-4 rounded-full w-full text-white";
      default:
        return "";
    }
  };

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-300 p-3">
      <div>
        <h3
          className={`font-bold font- md:text-xl mb-3 ${
            isDone ? "line-through font-light" : ""
          }`}
        >
          {item.title}
        </h3>
        <span className={`${getCategoryColor(selectedCategory)}`}>
          {selectedCategory}
        </span>
      </div>
      <div className="flex gap-2">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => setEditMode(true)}>Edit</button>
      </div>
    </div>
  );
};
