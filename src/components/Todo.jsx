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
            <option value="">None</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
  
        {/* update and cancel */}
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      </main>
    );
  }

  const handleCheckboxToggle = async () => {
    setIsDone(!isDone);

    // Add an update request here when the checkbox is toggled
    const res = await fetch("https://v1.appbackend.io/v1/rows/iupF0TppPECf", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: item._id,
        title: item.title,
        isdone: (!isDone).toString(),
        categories: selectedCategory,
      }),
    });

    const data = await res.json();
    console.log(data);
    router.refresh();
  };

  const getCategoryColor = (category) => {
    if (!category) {
      return "";
    }
    switch (category.toLowerCase()) {
      case "health":
        return "text-sm pb-1 pt-1 pl-3 pr-3 bg-red-500 rounded-full w-full text-white";
      case "work":
        return "bg-blue-500 text-sm pb-1 pt-1 pl-3 pr-3 rounded-full w-full text-white";
      case "school":
        return "bg-green-500 text-sm pb-1 pt-1 pl-3 pr-3 rounded-full w-full text-white";
      case "daily":
        return "bg-teal-500 text-sm pb-1 pt-1 pl-3 pr-3 rounded-full w-full text-white";
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center p-4 md-p-0">
      <input
          type="checkbox"
          checked={isDone}
          onChange={handleCheckboxToggle}
          className="mr-2 h-6 w-6 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
      <div className="flex w-full items-center justify-between border-b border-gray-300 p-3">
        <div className="flex items-center w-full">
          <div className="flex-1">
            <h3
              className={`font-bold text-md md:text-lg mb-2 ${
                isDone ? "line-through font-light" : ""
              }`}
            >
              {item.title}
            </h3>
            <span className={`${getCategoryColor(selectedCategory)}`}>
              {selectedCategory || ""}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleDelete} className="btn-error">
            Delete
          </button>
          <button onClick={() => setEditMode(true)} className="btn-secondary">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
