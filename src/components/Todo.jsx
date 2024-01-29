"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const Todo = ({ item }) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);

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
      body: JSON.stringify({ _id: item._id, title, content, isdone: "false" }),
    });
    const data = await res.json();
    console.log(data);
    router.refresh();
    setEditMode(false);
    router.refresh();
    toast.success("Berhasil Diupdate");
  }

  if (editMode) {
    return (
      <main className="space-y-2">
        <h3>Edit Todo</h3>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={handleUpdate}>Update</button>
      </main>
    );
  }

  return (
    <div>
      <h3 className="font-bold font-lg">{item.title}</h3>
      <p>{item.content}</p>
      <div className="flex gap-2">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => setEditMode(true)}>Edit</button>
      </div>
    </div>
  );
};
