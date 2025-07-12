import { useState } from "react";
import Game from "./ui/features/game/Game";
import Homepage from "./ui/home/Homepage";
import replaceClick from "./utils/replaceClick";
import { Account } from "./core/types/Account";

export default function App() {
  const [account, setAccount] = useState<Account | null>(Account.createDummy());

  const renderPage = () => {
    switch (window.location.pathname) {
      case "/play":
        return <Game />;
      default:
        return <Homepage account={account} />;
    }
  };

  return (
    <div className="bg-[#050505] bg-[url(/bg.jpg)] bg-contain bg-top bg-no-repeat">
      <div className="flex items-center justify-between bg-app-bar px-4 text-right text-xs">
        <a className="font-game-logo text-2xl" href="/" title="Home">
          ZP
        </a>
        {account ? (
          <p>
            Logged in as: <span className="emphasized">{account.username}</span>
            {" - "}
            <span className="emphasized">{account.email}</span>
            {" | "}
            <button
              onClick={(_) => {
                if (window.location.pathname === "/play") {
                  const confirmLogout = window.confirm(
                    "This will disconnect you from the game. Continue?",
                  );
                  if (!confirmLogout) return;
                }

                setAccount(null);
                replaceClick(undefined, "Remove account state from server");

                if (window.location.pathname === "/play") {
                  window.location.pathname = "/";
                }
              }}
              className="emphasized link"
            >
              logout
            </button>
          </p>
        ) : (
          <p>Not logged in</p>
        )}
      </div>

      <main className="container min-h-[100vh] pb-20">{renderPage()}</main>

      <div className="bg-app-bar py-4 text-paragraph">
        <footer className="container flex flex-col items-center justify-between gap-2 px-4 text-sm md:flex-row md:gap-0">
          <p className="text-center">
            <strong>ZP Recreated</strong> — Not affiliated with original
            developers
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
