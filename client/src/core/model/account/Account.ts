export interface PlayerAccount {
  playerId: string;
  username: string;
  email: string;
  hashedPassword: string;
}

export const PlayerAccount = {
  createDummy(): PlayerAccount {
    return {
      playerId: "1",
      username: "dummyuser",
      email: "dummy@example.com",
      hashedPassword: "123456",
    };
  },

  createGuest(): PlayerAccount {
    return {
      playerId: "0",
      username: "guestplayer",
      email: "player@guest.com",
      hashedPassword: "123456",
    };
  },

  fromJSON(data: any): PlayerAccount {
    if (
      typeof data === "object" &&
      data !== null &&
      typeof data.uuid === "string" &&
      typeof data.username === "string" &&
      typeof data.email === "string" &&
      typeof data.password === "string"
    ) {
      return {
        playerId: data.uuid,
        username: data.username,
        email: data.email,
        hashedPassword: data.password,
      };
    }

    throw new Error("Invalid account JSON");
  },
};
