import Example1 from "./ui/components/ex1";
import Example2 from "./ui/features/ex2";
import replaceClick from "./utils/replaceClick";

export default function App() {
  return (
    <div className="bg-[url(/src/resources/bg.jpg)] bg-cover">
      <div className="bg-app-bar p-2 text-right text-xs">
        <p>
          Logged in as:{' '}
          <span
            onClick={replaceClick}
            className="emphasized"
          > user
          </span> {" | "}
          <button onClick={replaceClick} className="emphasized link">logout</button>
        </p>
      </div>

      <main className="min-h-[100vh] container">
        <h1>MAIN CONTENT</h1>
        <Example1 />
        <Example2 />
      </main>

      <div className="bg-app-bar text-paragraph py-4">
        <footer className="container flex flex-col items-center justify-between gap-2 text-sm md:flex-row md:gap-0 px-4">
          <p className="text-center">
            <strong>ZP Recreated</strong> — Not affiliated with original developers
          </p>

          <div className="flex gap-4 underline">
            <a
              href="https://github.com/glennhenry/Zombie-Pandemic-Recreated"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              GitHub
            </a>
            <a
              href="https://discord.com/invite/Yrzsk7n6nf"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Discord
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
