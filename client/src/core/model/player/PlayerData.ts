export interface PlayerData {
  accountId: String,
  health: number;
}

export const PlayerData = {
  createDummy(): PlayerData {
    return {
      accountId: "0",
      health: 10,
    };
  },
};
