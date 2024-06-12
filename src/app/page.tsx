import { SignUp } from "./_components/sign-up";

export default async function Home() {
  return (
    <main className="containerDiv">
      <h1 className="mb-10">| Welcom to Tetris Game |</h1>
      <SignUp />
    </main>
  );
}
