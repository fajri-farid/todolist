import { CreateTodo } from "@/components/CreateTodo";
import { ToDoList } from "@/components/ToDoList";

export const dynamic = "force-dynamic";

async function getData() {
  const res = await fetch("https://v1.appbackend.io/v1/rows/iupF0TppPECf");
  const data = await res.json();
  return data;
}

export default async function Home() {
  const { data } = await getData();
  console.log(data);
  return (
    <main className="max-w-xl m-auto space-y-2">
      <CreateTodo />

      <ToDoList data={data} />
    </main>
  );
}
