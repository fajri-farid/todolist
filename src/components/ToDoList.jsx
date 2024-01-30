"use client"
import React from "react";
import { Todo } from "./Todo";
import { useEffect } from "react";
import { useState } from "react";

export const ToDoList = ({ data }) => {
  // nge sort list yang done kebawah
  const [todos, setTodos] = useState([]);

  const sortedData = data.sort((a, b) => (a.isdone === "true" ? 1 : -1));
  const categories = ["health", "daily", "work", "school"];

  // Gunakan useEffect untuk menyortir ulang daftar setiap kali data berubah
  useEffect(() => {
    // Fungsi untuk mengurutkan todos berdasarkan createdAt (anda bisa sesuaikan)
    const sortedTodos = [...data].sort((a, b) => {
      // Urutkan secara descending berdasarkan createdAt (anda bisa sesuaikan)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Update state dengan daftar yang sudah diurutkan
    setTodos(sortedTodos);
  }, [data]); // Gunakan [data] sebagai dependensi useEffect

  return (
    <main className="space-y-2 p-2">
      {sortedData.map((item) => {
        return <Todo key={item._id} item={item} categories={categories} />;
      })}
    </main>
  );
};
