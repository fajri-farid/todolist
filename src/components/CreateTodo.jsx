"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const CreateTodo = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateTodo() {
    // Validasi input
    if (!title.trim()) {
      toast.error("Please fill the title ");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://v1.appbackend.io/v1/rows/iupF0TppPECf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ title, isdone: "false" }]),
      });

      if (!res.ok) {
        throw new Error("Failed to create todo");
      }

      router.refresh();
      toast.success("Todo berhasil dibuat!");
      setTitle("");
    } catch (error) {
      console.error(error);
      toast.error("This didn't work.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="space-y-2">
      <h3>CreateTodo</h3>
      <input className="input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button disabled={loading} onClick={handleCreateTodo}>
        Create
      </button>
    </main>
  );
};

