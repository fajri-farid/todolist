"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const CreateTodo = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateTodo() {
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
        body: JSON.stringify([{ title, isdone: "false", "categories":"" }]),
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
    <main className="md:p-2 lg:p-4">
      <h3 className="bg-indigo-950 text-white text-center text-xl p-2 mb-2 md:mt-10">
        Create Todo
      </h3>
      <div className="flex flex-col p-4 space-y-4 md:space-y-6 lg:space-y-8">
        <input
          className="input border-2 border-indigo-950 p-4"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-indigo-950 text-white py-2 px-4 md:py-3 md:px-6 lg:py-4 lg:px-8"
          disabled={loading}
          onClick={handleCreateTodo}
        >
          Create
        </button>
      </div>
    </main>
  );
};
