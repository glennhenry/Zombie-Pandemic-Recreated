import Example1 from "./ui/components/ex1";
import Example2 from "./ui/features/ex2";

export default function App() {
  return (
    <div className="bg-[url(/src/resources/bg.jpg)] bg-cover">
      <div className="">
        <header className="container ">
          <h1>Header</h1>
        </header>
      </div>

      <main className="min-h-[100vh] container">
        <h1>MAIN CONTENT</h1>
        <Example1 />
        <Example2 />
      </main>

      <div className="bg-[#131313] text-gray-400 py-4">
        <footer className="container flex flex-col items-center justify-between gap-2 text-sm md:flex-row md:gap-0 px-4">
          <p className="text-center">
            <strong>ZP Recreated</strong> — Not affiliated with original developers
          </p>

          <div className="flex gap-4 underline">
            <a
              href="https://github.com/glennhenry/Zombie-Pandemic-Recreated"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="https://discord.com/invite/Yrzsk7n6nf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Discord
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
