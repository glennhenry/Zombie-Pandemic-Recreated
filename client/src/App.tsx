import { useState } from "react";
import Game from "./ui/features/game/Game";
import Homepage from "./ui/home/Homepage";
import replaceClick from "./utils/replaceClick";

export default function App() {
  const [account, _setAccount] = useState(true)

  const renderPage = () => {
    switch (window.location.pathname) {
      case '/play': return <Game />
      default: return <Homepage />
    }
  }

  return (
    <div className="bg-[url(/src/resources/bg.jpg)] bg-cover">
      <div className="bg-app-bar flex justify-between items-center px-4 text-right text-xs">
        <a className="text-2xl font-game-logo" href="/" title="Home">ZP</a>
        {account ? (
          <p>
            Logged in as: <span className="emphasized">user</span> {" | "}
            <button onClick={replaceClick} className="emphasized link">
              logout
            </button>
          </p>
        ) : (
          <p>Not logged in</p>
        )}
      </div>

      <main className="min-h-[100vh] container">
        {renderPage()}
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
