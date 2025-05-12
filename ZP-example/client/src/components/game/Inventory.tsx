import { useState } from "react";
import { Package, X, Check, ArrowRight } from "lucide-react";
import { Inventory as InventoryType, InventoryItem } from "@shared/schema";
import { useGame } from "@/context/GameContext";

interface InventoryProps {
  inventory: InventoryType;
  onUseItem: (itemId: string) => void;
  onDropItem: (itemId: string) => void;
  onEquipItem: (itemId: string) => void;
  isGameOver: boolean;
}

export default function Inventory({ 
  inventory, onUseItem, onDropItem, onEquipItem, isGameOver 
}: InventoryProps) {
  const [filter, setFilter] = useState<string>("all");
  const { selectedItemId, setSelectedItemId } = useGame();
  
  const filterInventory = (type: string) => {
    setFilter(type);
  };
  
  const filteredItems = inventory.items.filter(item => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  const handleUseItem = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    onUseItem(itemId);
  };

  const handleDropItem = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    onDropItem(itemId);
  };

  const handleEquipItem = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    onEquipItem(itemId);
  };

  const selectItem = (itemId: string) => {
    setSelectedItemId(selectedItemId === itemId ? null : itemId);
  };

  return (
    <div className="bg-neutral-dark border border-gray-700 rounded-lg overflow-hidden shadow-lg">
      <div className="bg-gray-800 px-3 py-2 flex justify-between items-center">
        <h2 className="font-heading text-sm text-white flex items-center">
          <Package className="h-4 w-4 mr-1" /> INVENTORY
        </h2>
        <div className="text-xs text-gray-400">
          <span>{inventory.usedSlots}</span>/<span>{inventory.totalSlots}</span> slots
        </div>
      </div>
      
      <div className="p-3 space-y-2">
        <div className="flex space-x-2 overflow-x-auto pb-2 text-xs">
          <button 
            className={`px-3 py-1 rounded-full ${filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => filterInventory('all')}
          >
            All
          </button>
          <button 
            className={`px-3 py-1 rounded-full ${filter === 'weapon' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => filterInventory('weapon')}
          >
            Weapons
          </button>
          <button 
            className={`px-3 py-1 rounded-full ${filter === 'food' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => filterInventory('food')}
          >
            Food
          </button>
          <button 
            className={`px-3 py-1 rounded-full ${filter === 'medical' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => filterInventory('medical')}
          >
            Medical
          </button>
          <button 
            className={`px-3 py-1 rounded-full ${filter === 'armor' ? 'bg-gray-800 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => filterInventory('armor')}
          >
            Armor
          </button>
        </div>
        
        <div className="h-64 overflow-y-auto px-1">
          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {filter === "all" 
                ? "Your inventory is empty" 
                : `No ${filter} items in inventory`}
            </div>
          )}
          
          {filteredItems.map((item) => (
            <InventoryItemRow 
              key={item.id}
              item={item}
              isSelected={item.id === selectedItemId}
              onSelect={selectItem}
              onUse={handleUseItem}
              onDrop={handleDropItem}
              onEquip={handleEquipItem}
              disabled={isGameOver}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface InventoryItemRowProps {
  item: InventoryItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUse: (e: React.MouseEvent, id: string) => void;
  onDrop: (e: React.MouseEvent, id: string) => void;
  onEquip: (e: React.MouseEvent, id: string) => void;
  disabled: boolean;
}

function InventoryItemRow({ 
  item, isSelected, onSelect, onUse, onDrop, onEquip, disabled 
}: InventoryItemRowProps) {
  return (
    <div 
      className={`
        inventory-item flex justify-between items-center p-2 border-b border-gray-700 cursor-pointer
        ${isSelected ? 'bg-gray-800' : 'hover:bg-gray-800 hover:bg-opacity-50'}
        ${disabled ? 'opacity-50' : ''}
      `}
      onClick={() => !disabled && onSelect(item.id)}
    >
      <div>
        <div className="font-mono text-accent text-sm">{item.name}</div>
        <div className="text-xs text-gray-400">{item.effect}</div>
        {item.type === 'weapon' && item.damage && (
          <div className="text-xs text-gray-400">Damage: {item.damage}</div>
        )}
        {item.type === 'armor' && item.defense && (
          <div className="text-xs text-gray-400">Defense: {item.defense}</div>
        )}
      </div>
      <div className="flex space-x-1">
        {(item.type === 'food' || item.type === 'medical') && (
          <button 
            className="p-1 text-xs bg-gray-800 rounded hover:bg-gray-700 flex items-center" 
            title="Use"
            onClick={(e) => !disabled && onUse(e, item.id)}
            disabled={disabled}
          >
            <Check className="h-3 w-3 mr-1" /> Use
          </button>
        )}
        
        {(item.type === 'weapon' || item.type === 'armor') && (
          <button 
            className="p-1 text-xs bg-gray-800 rounded hover:bg-gray-700 flex items-center" 
            title="Equip"
            onClick={(e) => !disabled && onEquip(e, item.id)}
            disabled={disabled}
          >
            <ArrowRight className="h-3 w-3 mr-1" /> Equip
          </button>
        )}
        
        <button 
          className="p-1 text-xs bg-gray-800 rounded hover:bg-gray-700 flex items-center" 
          title="Drop"
          onClick={(e) => !disabled && onDrop(e, item.id)}
          disabled={disabled}
        >
          <X className="h-3 w-3 mr-1" /> Drop
        </button>
      </div>
    </div>
  );
}
