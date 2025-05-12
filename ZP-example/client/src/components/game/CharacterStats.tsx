import { Heart, Utensils, Calendar, Skull, Sword, Shield } from "lucide-react";
import { PlayerStats } from "@shared/schema";

interface CharacterStatsProps {
  playerStats: PlayerStats;
}

export default function CharacterStats({ playerStats }: CharacterStatsProps) {
  const { health, hunger, daysSurvived, zombiesKilled, equipped } = playerStats;

  return (
    <div className="bg-neutral-dark border border-gray-700 rounded-lg overflow-hidden shadow-lg">
      <div className="bg-gray-800 px-3 py-2">
        <h2 className="font-heading text-sm text-white">CHARACTER STATS</h2>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Health bar */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-sans flex items-center">
            <Heart className="h-4 w-4 mr-1 text-status-health" /> Health
          </span>
          <div className="w-2/3">
            <div className="status-bar bg-gray-700" style={{ height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
              <div 
                className="bg-status-health h-full" 
                style={{ width: `${health}%` }}
              />
            </div>
            <div className="text-xs text-right mt-1">{health}/100</div>
          </div>
        </div>
        
        {/* Hunger bar */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-sans flex items-center">
            <Utensils className="h-4 w-4 mr-1 text-status-hunger" /> Hunger
          </span>
          <div className="w-2/3">
            <div className="status-bar bg-gray-700" style={{ height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
              <div 
                className="bg-status-hunger h-full" 
                style={{ width: `${hunger}%` }}
              />
            </div>
            <div className="text-xs text-right mt-1">{hunger}/100</div>
          </div>
        </div>
        
        {/* Days survived */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-sans flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-blue-400" /> Days Survived
          </span>
          <span className="font-mono">{daysSurvived}</span>
        </div>
        
        {/* Zombies killed */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-sans flex items-center">
            <Skull className="h-4 w-4 mr-1 text-purple-400" /> Zombies Killed
          </span>
          <span className="font-mono">{zombiesKilled}</span>
        </div>
        
        {/* Equipped items */}
        <div className="mt-6 p-3 bg-gray-800 rounded">
          <h3 className="text-xs font-heading mb-2 flex items-center">
            <Shield className="h-3 w-3 mr-1" /> EQUIPPED ITEMS
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="border border-gray-700 rounded p-2 text-xs">
              <div className="text-gray-400 flex items-center">
                <Sword className="h-3 w-3 mr-1" /> Weapon
              </div>
              <div className="font-mono text-accent">{equipped.weapon || "None"}</div>
            </div>
            <div className="border border-gray-700 rounded p-2 text-xs">
              <div className="text-gray-400 flex items-center">
                <Shield className="h-3 w-3 mr-1" /> Armor
              </div>
              <div className="font-mono text-accent">{equipped.armor || "None"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
