import Link from "next/link";

export default function Header() {
  return (
    <header className="flex p-4 bg-rose-500 gap-8 items-center">
      <h1 className="text-xl text-white">Checkpoint Frontend</h1>
      <Link href="/" className="text-white hover:text-red-300">Countries</Link>
    </header>
  );
}
