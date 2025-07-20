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
};
