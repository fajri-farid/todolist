import { CreateTodo } from "@/components/CreateTodo";
import { DateComponent } from "@/components/DateComponents";
import { Header } from "@/components/Header";
import { ToDoList } from "@/components/ToDoList";
import { Footer } from "@/components/footer";

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
    <main className="max-w-xl md:max-w-2xl m-auto space-y-2">
      <Header/>
      <CreateTodo />
      <DateComponent />
      <ToDoList data={data} />
      <Footer/>
    </main>
  );
}
