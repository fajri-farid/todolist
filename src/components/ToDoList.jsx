"use client"
import React from "react";
import { Todo } from "./Todo";
import { useEffect } from "react";
import { useState } from "react";

export const ToDoList = ({ data }) => {
  const [todos, setTodos] = useState([]);

  const sortedData = data.sort((a, b) => (a.isdone === "true" ? 1 : -1));
  const categories = ["health", "daily", "work", "school"];

  useEffect(() => {
    const sortedTodos = [...data].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setTodos(sortedTodos);
  }, [data]);

  return (
    <main className="space-y-2 p-2">
      {sortedData.map((item) => {
        return <Todo key={item._id} item={item} categories={categories} />;
      })}
    </main>
  );
};
