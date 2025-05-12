import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Search, DoorOpen, Package, Bed } from "lucide-react";

interface ActionBarProps {
  onMove: (direction: 'north' | 'south' | 'east' | 'west') => void;
  onSearch: () => void;
  onEnterBuilding: () => void;
  onRest: () => void;
  isGameOver: boolean;
  inCombat: boolean;
}

export default function ActionBar({ 
  onMove, onSearch, onEnterBuilding, onRest, isGameOver, inCombat 
}: ActionBarProps) {
  const isDisabled = isGameOver || inCombat;

  const actionButtons = [
    { 
      icon: <ArrowUp className="h-6 w-6" />, 
      label: 'North', 
      onClick: () => onMove('north'),
      disabled: isDisabled
    },
    { 
      icon: <ArrowDown className="h-6 w-6" />, 
      label: 'South', 
      onClick: () => onMove('south'),
      disabled: isDisabled
    },
    { 
      icon: <ArrowRight className="h-6 w-6" />, 
      label: 'East', 
      onClick: () => onMove('east'),
      disabled: isDisabled
    },
    { 
      icon: <ArrowLeft className="h-6 w-6" />, 
      label: 'West', 
      onClick: () => onMove('west'),
      disabled: isDisabled
    },
    { 
      icon: <Search className="h-6 w-6" />, 
      label: 'Search', 
      onClick: onSearch,
      disabled: isDisabled
    },
    { 
      icon: <DoorOpen className="h-6 w-6" />, 
      label: 'Enter', 
      onClick: onEnterBuilding,
      disabled: isDisabled
    },
    { 
      icon: <Package className="h-6 w-6" />, 
      label: 'Inventory', 
      onClick: () => {},
      disabled: true // This would be controlled by a modal in a full implementation
    },
    { 
      icon: <Bed className="h-6 w-6" />, 
      label: 'Rest', 
      onClick: onRest,
      disabled: isDisabled
    }
  ];

  return (
    <div className="bg-neutral-dark border border-gray-700 rounded-lg overflow-hidden shadow-lg">
      <div className="bg-gray-800 px-3 py-2">
        <h2 className="font-heading text-sm text-white">ACTIONS</h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3">
        {actionButtons.map((button, index) => (
          <button 
            key={index}
            className={`
              flex flex-col items-center justify-center px-3 py-2 rounded transition
              ${button.disabled 
                ? 'bg-gray-900 text-gray-600 cursor-not-allowed' 
                : 'bg-gray-800 hover:bg-gray-700 text-white'}
            `}
            onClick={button.onClick}
            disabled={button.disabled}
          >
            <span className="mb-1">{button.icon}</span>
            <span className="text-xs">{button.label}</span>
          </button>
        ))}
      </div>
      
      {isGameOver && (
        <div className="p-3 bg-red-900 bg-opacity-30 text-center text-red-300 text-sm">
          Game Over - You have died
        </div>
      )}
      
      {inCombat && !isGameOver && (
        <div className="p-3 bg-yellow-900 bg-opacity-30 text-center text-yellow-300 text-sm">
          In Combat - Deal with the zombie first!
        </div>
      )}
    </div>
  );
}
