// ToDoList.jsx
import React from "react";
import { Todo } from "./Todo";

export const ToDoList = ({ data }) => {
  // nge sort list yang done kebawah 
  const sortedData = data.sort((a, b) => (a.isdone === "true" ? 1 : -1));
  const categories = ["health", "daily", "work", "school"];

  return (
    <main className="space-y-2 p-2">
      {sortedData.map((item) => {
        return <Todo key={item._id} item={item} categories={categories}/>;
      })}
    </main>
  );
};

