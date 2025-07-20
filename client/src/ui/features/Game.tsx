import type { Account } from "../../core/types/Account";

interface GameProps {
    account?: Account | null;
}

export default function Game(_props: GameProps) {
  return (
    // Game container
    <div className="mx-auto h-[800px] w-full max-w-[1200px] min-w-[800px] bg-amber-800">
      
    </div>
  );
}
