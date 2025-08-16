import { Account } from "./Account";

export interface Player {
  account?: Account;
  health: number;
}

export const Player = {
  createDummy(): Player {
    return {
      account: Account.createDummy(),
      health: 10,
    };
  },
};
