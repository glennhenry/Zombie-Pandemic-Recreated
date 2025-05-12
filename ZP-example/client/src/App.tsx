import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Game from "@/pages/Game";
import { GameProvider } from "@/context/GameContext";

// Separate route components to ensure clean rendering
const GameRoute = () => <Game />;
const NotFoundRoute = () => <NotFound />;

function Router() {
  return (
    <Switch>
      <Route path="/" component={GameRoute} />
      <Route component={NotFoundRoute} />
    </Switch>
  );
}

// Main App component with proper provider nesting
function App() {
  return (
    <TooltipProvider>
      <GameProvider>
        <Toaster />
        <Router />
      </GameProvider>
    </TooltipProvider>
  );
}

export default App;
