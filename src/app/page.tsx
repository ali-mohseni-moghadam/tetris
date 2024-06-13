import Link from "next/link";

export default async function Home() {
  return (
    <main className="containerDiv">
      <h1 className="mb-10">| Welcom to Tetris Game |</h1>

      <div className="flex gap-x-5">
        <button className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">
          <Link href="/signup">Sign Up</Link>
        </button>

        <button className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">
          <Link href="/signin">Sign In</Link>
        </button>

        <button className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">
          <Link href="/game">Start Game</Link>
        </button>
      </div>
    </main>
  );
}
