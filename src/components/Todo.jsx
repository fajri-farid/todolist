"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const Todo = ({ item }) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [isDone, setIsDone] = useState(item.isdone === "true");

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
      body: JSON.stringify({ _id: item._id, title, isdone: isDone.toString() }),
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Title</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
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
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={handleUpdate}
        >
          Update
        </button>
      </main>
    );
  }

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-300 p-3">
      <h3 className={`font-bold font-lg ${isDone ? "line-through" : ""}`}>
        {item.title}
      </h3>
      <div className="flex gap-2">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => setEditMode(true)}>Edit</button>
      </div>
    </div>
  );
};
