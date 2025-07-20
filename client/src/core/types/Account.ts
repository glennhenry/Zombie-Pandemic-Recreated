export interface Account {
  uuid: number;
  username: string;
  email: string;
  password: string;
}

export const Account = {
  createDummy(): Account {
    return {
      uuid: 1,
      username: "dummyuser",
      email: "dummy@example.com",
      password: "123456",
    };
  },

  createGuest(): Account {
    return {
      uuid: 0,
      username: "guestplayer",
      email: "player@guest.com",
      password: "123456",
    };
  },

  fromJSON(data: any): Account {
    if (
      typeof data === "object" &&
      data !== null &&
      typeof data.uuid === "number" &&
      typeof data.username === "string" &&
      typeof data.email === "string" &&
      typeof data.password === "string"
    ) {
      return {
        uuid: data.uuid,
        username: data.username,
        email: data.email,
        password: data.password,
      };
    }

    throw new Error("Invalid account JSON");
  },
};
