import { ReactNode } from "react";
import { useGame } from "@/context/GameContext";

interface GameLayoutProps {
  children: ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  const { saveGame, startNewGame } = useGame();

  return (
    <div className="flex flex-col min-h-screen bg-neutral-dark">
      <header className="bg-primary p-3 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-heading text-white">ZOMBIE<span className="text-secondary">SURVIVAL</span></h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={saveGame}
              className="px-3 py-1 bg-accent text-neutral-dark font-sans font-semibold rounded hover:bg-opacity-80 text-sm"
            >
              Save Game
            </button>
            <button 
              onClick={startNewGame}
              className="px-3 py-1 bg-neutral-light bg-opacity-20 text-neutral-light font-sans rounded hover:bg-opacity-30 text-sm"
            >
              New Game
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-neutral-dark border-t border-gray-800 p-4 text-center text-xs text-gray-500">
        <p>Text-based Zombie Survival Game | Maps powered by OpenStreetMap | Area descriptions by AI</p>
      </footer>
    </div>
  );
}
