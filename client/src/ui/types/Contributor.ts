export interface Contributor {
  name: string;
  avatarUrl: string;
}

export const Contributor = {
  createDummy(): Contributor[] {
    return Array.from({ length: 6 }, (_, i) => ({
      name: "glennhenry",
      avatarUrl: "https://avatars.githubusercontent.com/u/107945233?v=4",
    }));
  },
};
