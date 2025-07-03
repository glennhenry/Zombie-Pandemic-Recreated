# Zombie Pandemic Recreated

Zombie Pandemic is a browser-based (PBBG) zombie survival MMORPG made by Pixel Pandemic (2009-2015) [(fb page)](https://www.facebook.com/zombiepandemicgame). The game features a survivor exploring the abandoned urban with the endgoal of escaping the city.

![ZP poster](./zp-icon.jpg)

# How to Play

The game is a work in progress and is not playable currently.

# Community

Ask questions in issues or join our [community Discord server](https://discord.com/invite/Yrzsk7n6nf).

# About The Project

This project with the codename of **ZPRecreated** attempts to recreate the classic Zombie Pandemic.

We can't promise the precise recreation due to the incomplete information we have about the game (such as detailed items or zombies stats) and most importantly, game assets not being completely available and copyrighted.

This is purely a fan-made project created for hobby and learning purposes. ZPRecreated aims to be a spiritual successor of the classic, that is by retaining important elements of ZP, adjusting it, and potentially expanding it.

## Technical Details

The game is separated into client and server component. The client component is the web application that you run to play the game, while the server component serves the web page, game assets, and handles game requests.

The original game involve massive multiplayer play. Currently, we are not planning to set up a central server for everyone to connect to. The game server will self-hosted by each player. In other word, although the game has multiplayer playability, people would play it as if it is a single player game. We may simulate multiplayer experience (like bots) for this purpose.

### Client (Frontend)

- [React](https://react.dev/) with [Typescript](https://www.typescriptlang.org/) as the UI library.
- [TailwindCSS](https://tailwindcss.com/) for UI utilities.
- [Vite](https://vite.dev/) as the build tool.

### Server (Backend)

- [Kotlin](https://kotlinlang.org/) with [Ktor](https://ktor.io/) for server.

## Development Guide

- Client requirement: Node.js (v20+)
- Server requirement: Java 21, Gradle 8.5

### Dev Mode

#### 1. Clone the Repository

```bash
git clone https://github.com/glennhenry/Zombie-Pandemic-Recreated.git
cd Zombie-Pandemic-Recreated
```

#### 2. Start the Client in Dev Mode

```bash
cd client
npm install
npm run dev
```

Client runs at `http://localhost:5173`.

#### 3. Start the Server in Dev Mode

```bash
cd server
./gradlew run
```

Server runs at `http://localhost:8080`.

### Build & Deployment

#### 1. Build the Client and Server

Run `build.bat` (Windows) or `build.sh` (Unix). Output will be in `build/` directory.

#### 2. Run the Game Server

Install [Java](https://www.java.com/en/download/) and add it to system PATH.

In the build directory:

```bash
java -jar server/build/libs/zpr-server.jar
```

Frontend + API served on http://localhost:8080.
The default port `8080` and host `0.0.0.0` can be overridden by:

```bash
java -jar server/build/libs/zpr-server.jar -port=1234 -host=1.2.3.4
```

### Contributing

As of now, we don't have a standard on how to contribute. We also don't own a wiki or documentation on the project. Best way to contribute is by making question, feedback, suggestion on [issues](https://github.com/glennhenry/Zombie-Pandemic-Recreated/issues), or directly make a change in code and apply a pull request.

We have two branches in this repo.

- The `main` branch is intended for production ready code. In the future, we will set up a GitHub workflows that automatically build the game and create a GitHub releases.
- The `dev` branch is where all development happens. You can commit and push or pull freely. Experimental and incomplete features live here before it goes to `main` branch.
