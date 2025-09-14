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

The game is separated into client and server component. The client component is the web application that you run to play the game, while the server component serves the web page (in production), game assets, and handles game requests.

The original game involve massive multiplayer play. Currently, we are not planning to set up a central server for everyone to connect to. The game server will self-hosted by each player. In other word, although the game may have some multiplayer capability, people would play it as if it is a single player game. We may simulate multiplayer experience (like bots) for this purpose.

### Client & Server

This project is built entirely with [Kotlin](https://kotlinlang.org/) and organized as a multi-module setup, containing a client, a server, and a shared module for common data models.

- `site`: the client-side module, built with the [Kobweb](https://kobweb.varabyte.com/) framework (Kotlin/JS) for the web front-end.
- `server`: the server-side module, implemented with [Ktor](https://ktor.io/) as the backend library.
- `common`: a multiplatform module that provides shared code and models used by both the Kotlin/JS and Kotlin/JVM parts of the project.

## Development Guide

To develop, please install the following:

- Java 24 (also add to PATH).
- [Kobweb](https://kobweb.varabyte.com/docs/getting-started/getting-kobweb).
- [MongoDB community edition](https://www.mongodb.com/try/download/community).

### Dev Mode

#### 1. Clone the Repository

```bash
git clone https://github.com/glennhenry/Zombie-Pandemic-Recreated.git
cd Zombie-Pandemic-Recreated
```

#### 2. Start the Kobweb server

```bash
cd site
kobweb run
```

Site runs at `http://localhost:8080`.

#### 3. Start the MongoDB server

Double click on `runmongo.bat` or `runmongo.sh`. Consult the [official docs](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/#run-mongodb-community-edition-from-the-command-interpreter) for details.

MongoDB runs at `localhost:27017`.

#### 4. Start the Server

```bash
./gradlew run
```

Server runs at `http://localhost:8081`. You can also do it via Intellij IDE by pressing run on `server/src/main/kotlin/Application.kt`

### Build & Run

There is a GitHub workflow which automatically build everything and create a GitHub release, though this isn't meant for anyone except myself.

To build the project locally:

#### 1. Build the Client and Server

Run `build.bat` (Windows) or `build.sh` (Unix). Output will be in `deploy/` directory.

#### 2. Run the Game Server

In the deploy directory:

```bash
java -jar zpr-server.jar
```

Frontend + API served on http://localhost:8081.

The default port `8080` and host `0.0.0.0` can be overridden by making environment variable `PORT` and `HOST`, respectively. You should also turn off development mode in production environment by setting the environment variable `DEV_MODE` to false.

For example, in Powershell (set variables temporarily):

```bash
$env:PORT = "8089"
$env:HOST = "127.0.0.1"
$env:DEV_MODE = "false"
java -jar zpr-server.jar
```

### Contributing

As of now, we don't have a standard on how to contribute. Best way to contribute is by making question, feedback, suggestion on [issues](https://github.com/glennhenry/Zombie-Pandemic-Recreated/issues), or directly make a change in code and apply a pull request.

For simplicity, we will be developing on main branch directly.

Since this is an open-source fan project, we have specification about the game at `docs/` directory. It is a guide and describe how we develop the game.
