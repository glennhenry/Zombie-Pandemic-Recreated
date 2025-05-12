import { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import GameLayout from "@/components/layout/GameLayout";
import MapView from "@/components/game/MapView";
import GameConsole from "@/components/game/GameConsole";
import ActionBar from "@/components/game/ActionBar";
import CharacterStats from "@/components/game/CharacterStats";
import Inventory from "@/components/game/Inventory";
import CombatModal from "@/components/game/CombatModal";
import { Skeleton } from "@/components/ui/skeleton";

export default function Game() {
  const { 
    gameState, isLoading, error,
    movePlayer, searchLocation, enterBuilding, rest,
    useItem, dropItem, equipItem,
    attackZombie, fleeCombat, endCombat
  } = useGame();

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.player.stats.health <= 0) return; // Disable controls if player is dead
      if (gameState.combatState.inCombat) return; // Disable movement controls during combat
      
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          movePlayer('north');
          break;
        case 's':
        case 'ArrowDown':
          movePlayer('south');
          break;
        case 'd':
        case 'ArrowRight':
          movePlayer('east');
          break;
        case 'a':
        case 'ArrowLeft':
          movePlayer('west');
          break;
        case 'e':
          enterBuilding();
          break;
        case 'f':
          searchLocation();
          break;
        case 'r':
          rest();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.player.stats.health, gameState.combatState.inCombat, movePlayer, enterBuilding, searchLocation, rest]);

  // Game over detection
  const isGameOver = gameState.player.stats.health <= 0;

  if (isLoading) {
    return (
      <GameLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-heading mb-4">Loading Zombie Survival Game...</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </GameLayout>
    );
  }

  if (error) {
    return (
      <GameLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-heading text-red-500 mb-4">Error</h1>
          <p className="text-lg mb-4">{error}</p>
          <button 
            className="px-4 py-2 bg-accent text-white rounded"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout>
      <div className="flex-grow container mx-auto p-4 lg:flex lg:space-x-4">
        {/* Left column - Map and Terminal */}
        <div className="lg:w-2/3 space-y-4">
          <MapView 
            mapData={gameState.map} 
            playerPosition={gameState.player.position} 
            currentLocation={gameState.location}
          />
          
          <GameConsole 
            gameMessages={gameState.gameMessages} 
            isGameOver={isGameOver}
          />
          
          <ActionBar 
            onMove={movePlayer}
            onSearch={searchLocation}
            onEnterBuilding={enterBuilding}
            onRest={rest}
            isGameOver={isGameOver}
            inCombat={gameState.combatState.inCombat}
          />
        </div>

        {/* Right sidebar - Character and Inventory */}
        <div className="lg:w-1/3 mt-4 lg:mt-0 space-y-4">
          <CharacterStats 
            playerStats={gameState.player.stats} 
          />
          
          <Inventory 
            inventory={gameState.player.inventory}
            onUseItem={useItem}
            onDropItem={dropItem}
            onEquipItem={equipItem}
            isGameOver={isGameOver}
          />
        </div>
      </div>

      {/* Combat Modal */}
      {gameState.combatState.inCombat && gameState.combatState.enemy && (
        <CombatModal
          combatState={gameState.combatState}
          playerHealth={gameState.player.stats.health}
          onAttack={attackZombie}
          onFlee={fleeCombat}
          onClose={endCombat}
        />
      )}

      {/* Game Over Modal */}
      {isGameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-neutral-dark border border-secondary p-6 rounded-lg shadow-lg max-w-md w-full mx-4 text-center">
            <h2 className="font-heading text-3xl text-secondary mb-4">GAME OVER</h2>
            <p className="mb-6">You survived for {gameState.player.stats.daysSurvived} days and killed {gameState.player.stats.zombiesKilled} zombies.</p>
            <button 
              className="px-6 py-3 bg-accent text-white font-sans font-semibold rounded hover:bg-opacity-80"
              onClick={() => window.location.reload()}
            >
              Start New Game
            </button>
          </div>
        </div>
      )}
    </GameLayout>
  );
}
