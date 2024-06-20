import Link from "next/link";

export default async function Home() {
  return (
    <main className="containerDiv flex-col">
      <h1 className="text-bold mb-16 text-2xl sm:text-4xl">
        | Welcom to Tetris Game |
      </h1>

      <div className="flex flex-col gap-5 sm:flex-row">
        <button className="rounded-full border border-gray-600 bg-gray-700 px-10 py-3 transition duration-300 hover:bg-gray-900 hover:text-orange-500">
          <Link href="/signup">Sign Up</Link>
        </button>

        <button className="rounded-full border border-gray-600 bg-gray-700 px-10 py-3 transition duration-300 hover:bg-gray-900 hover:text-orange-500">
          <Link href="/signin">Sign In</Link>
        </button>

        <button className="rounded-full border border-gray-600 bg-gray-700 px-10 py-3 transition duration-300 hover:bg-gray-900 hover:text-orange-500">
          <Link href="/game">Start Game</Link>
        </button>
      </div>
    </main>
  );
}
