import type { Account } from "./Account";

export interface Player {
  account?: Account;
  health: number;
}
