import React from "react";
import { Todo } from "./Todo";

export const ToDoList = ({ data }) => {
  return (
    <main className=" p-4">
      <h1 className="p-2 text-center font-bold text-xl">Todos!</h1>
      <div className="space-y-4">
      {data.map((item) => {
        return <Todo key={item._id} item={item} />;
      })}</div>
    </main>
  );
};
