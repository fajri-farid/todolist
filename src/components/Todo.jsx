// components/Todo.js
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
    toast.success("Berhasil diupdate");
  }

  return (
    <div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => setIsDone(!isDone)}
          className="mr-2"
        />
        <h3 className={`font-bold font-lg ${isDone ? "line-through" : ""}`}>
          {item.title}
        </h3>
      </div>
      <div className="flex gap-2">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => setEditMode(true)}>Edit</button>
      </div>
    </div>
  );
};
