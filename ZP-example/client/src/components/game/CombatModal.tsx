import { Shield, X, Skull, Swords, AlertTriangle } from "lucide-react";
import { CombatState } from "@shared/schema";

interface CombatModalProps {
  combatState: CombatState;
  playerHealth: number;
  onAttack: () => void;
  onFlee: () => void;
  onClose: () => void;
}

export default function CombatModal({ 
  combatState, playerHealth, onAttack, onFlee, onClose 
}: CombatModalProps) {
  const { enemy, logs } = combatState;
  
  if (!enemy) return null;
  
  const isDefeated = enemy.health <= 0;
  const isPlayerDead = playerHealth <= 0;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-neutral-dark border border-secondary p-4 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center mb-4">
          <h2 className="font-heading text-xl text-secondary">ZOMBIE ENCOUNTER</h2>
          <p className="text-sm text-gray-400">
            {isDefeated 
              ? "You defeated the zombie!" 
              : isPlayerDead 
                ? "You have been killed!" 
                : "Choose your action carefully"}
          </p>
        </div>
        
        <div className="mb-4 p-3 bg-black bg-opacity-50 rounded border border-gray-800">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-sm">{enemy.name}</span>
              <div className="status-bar bg-gray-800 mt-1" style={{ height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                <div 
                  className="bg-secondary h-full" 
                  style={{ width: `${Math.max(0, (enemy.health / (enemy.health + enemy.damage) * 100))}%` }}
                />
              </div>
            </div>
            <div className="text-3xl">🧟</div>
          </div>
          
          <div className="text-sm mt-3">
            {enemy.description}
          </div>
        </div>
        
        {!isDefeated && !isPlayerDead && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button 
              className="p-2 bg-secondary text-white font-sans font-semibold rounded hover:bg-opacity-80 flex items-center justify-center"
              onClick={onAttack}
            >
              <Swords className="h-4 w-4 mr-1" /> Attack
            </button>
            <button 
              className="p-2 bg-gray-700 text-white font-sans font-semibold rounded hover:bg-opacity-80 flex items-center justify-center"
              onClick={onFlee}
            >
              <AlertTriangle className="h-4 w-4 mr-1" /> Flee
            </button>
          </div>
        )}
        
        <div 
          className="p-3 bg-black bg-opacity-50 rounded border border-gray-800 mb-4 h-24 overflow-y-auto font-mono text-xs"
          style={{ fontFamily: '"Source Code Pro", monospace' }}
        >
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm flex items-center">
              <Shield className="h-4 w-4 mr-1" /> Your Health
            </span>
            <div className="status-bar bg-gray-800 mt-1 w-32" style={{ height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
              <div 
                className="bg-status-health h-full" 
                style={{ width: `${playerHealth}%` }}
              />
            </div>
          </div>
          <button 
            className="px-4 py-2 bg-gray-800 text-white font-sans text-sm rounded hover:bg-gray-700 flex items-center"
            onClick={onClose}
            disabled={!isDefeated && !isPlayerDead}
          >
            <X className="h-4 w-4 mr-1" /> Close
          </button>
        </div>
        
        {isPlayerDead && (
          <div className="mt-4 p-3 bg-red-900 bg-opacity-30 rounded text-center">
            <Skull className="h-6 w-6 mx-auto mb-2" />
            <p className="text-red-300">You have died!</p>
          </div>
        )}
      </div>
    </div>
  );
}
