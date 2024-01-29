import React from "react";
import { Todo } from "./Todo";

export const ToDoList = ({ data }) => {
  return (
    <main className="space-y-4 ">
      {data.map((item) => {
        return <Todo key={item._id} item={item} />;
      })}
    </main>
  );
};
