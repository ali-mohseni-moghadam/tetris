import { CreateUser } from "./_components/create-user";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] p-10 text-white">
      <h1 className="mb-10">| Welcom to Tetris Game |</h1>
      <CreateUser />
    </main>
  );
}
