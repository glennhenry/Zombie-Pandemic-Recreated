import { useRef, useEffect, useState } from "react";

interface GameConsoleProps {
  gameMessages: string[];
  isGameOver: boolean;
}

export default function GameConsole({ gameMessages, isGameOver }: GameConsoleProps) {
  const consoleRef = useRef<HTMLDivElement>(null);
  const [command, setCommand] = useState<string>("");

  // Scroll to bottom when messages change
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [gameMessages]);

  // Format messages with styling
  const formatMessage = (message: string) => {
    // Highlight location names
    if (message.includes("You are now at") || message.includes("You are at")) {
      return <p className="location">{message}</p>;
    }
    
    // Highlight item discoveries
    if (message.includes("found") && (
        message.includes("Kit") || 
        message.includes("Food") || 
        message.includes("Weapon") ||
        message.includes("Ammo") ||
        message.includes("Pistol") ||
        message.includes("Bandage")
      )) {
      return <p className="item">{message}</p>;
    }
    
    // Highlight danger messages
    if (message.includes("zombie") || 
        message.includes("Zombie") ||
        message.includes("damage") ||
        message.includes("danger") ||
        message.includes("killed") ||
        message.includes("died") ||
        message.includes("attack")) {
      return <p className="danger">{message}</p>;
    }
    
    // Regular message
    return <p>{message}</p>;
  };

  const handleCommandInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && command.trim()) {
      // Command processing would go here in a full implementation
      setCommand("");
    }
  };

  const handleSendCommand = () => {
    if (command.trim()) {
      // Command processing would go here in a full implementation
      setCommand("");
    }
  };

  return (
    <div className="bg-neutral-dark border border-gray-700 rounded-lg overflow-hidden shadow-lg">
      <div className="bg-gray-800 px-3 py-2">
        <h2 className="font-heading text-sm text-white">GAME CONSOLE</h2>
      </div>
      
      <div 
        ref={consoleRef}
        className="terminal p-3 text-sm"
        style={{
          fontFamily: '"Source Code Pro", monospace',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#E5E5E5',
          overflowY: 'auto',
          height: '300px'
        }}
      >
        {gameMessages.map((message, index) => (
          <div key={index}>{formatMessage(message)}</div>
        ))}
        {isGameOver && (
          <p className="danger font-bold mt-2">GAME OVER - You have died. Reload the page to start a new game.</p>
        )}
      </div>
      
      <div className="p-3 bg-gray-800 border-t border-gray-700">
        <div className="flex space-x-2">
          <input 
            type="text" 
            className="command-input flex-grow px-3 py-2 rounded"
            style={{
              backgroundColor: '#2D3746',
              color: '#E5E5E5',
              border: '1px solid #4A5568',
              fontFamily: '"Source Code Pro", monospace'
            }}
            placeholder="Enter command..." 
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={handleCommandInput}
            disabled={isGameOver}
          />
          <button 
            className="px-4 py-2 bg-accent text-neutral-dark font-sans font-semibold rounded hover:bg-opacity-80"
            onClick={handleSendCommand}
            disabled={isGameOver}
          >
            ⤴
          </button>
        </div>
      </div>
    </div>
  );
}
