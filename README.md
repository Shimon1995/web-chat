# WebSocket Chat

This is a web chat application.

## Getting Started

### Prerequisites

You need `node.js` with `yarn` in order to run this application.

```bash
sudo pacman -S node yarn
```

### Installing

In order to begin, you have to `git clone` this repository

Then run an installation command from a corresponding directory

```bash
yarn
```

For npm

```bash
npm i
```

An installation will end with a notification about completion. If an error occures, carefully read the instructions

## Deploying

To start developing mode on your localhost, run the command below in your terminal

```bash
yarn dev
```

or

```bash
npm run dev
```

An application will start on http://localhost:3000
Internally it runs `nodemon` in corresponding directory

### Build

To compile the app to a default web stack

```bash
yarn build
```

or

```bash
npm run build
```

### Run

After it's been compiled, run the command below to start the application

```bash
yarn start
```

or

```bash
npm start
```

## Built With

- [Next.js](https://nextjs.org/) - The JS/TS framework
- [Redux](https://react-redux.js.org/) - The library to manipulate a state
- [Socket.io](https://socket.io/) - The library for WS connection
- [TypeScript](https://www.typescriptlang.org/) - The programming language
- [Yarn](https://yarnpkg.com/en/) - The package manager
- [express](https://expressjs.com/) - web frame for node.js

## Author

[Shimon1995](https://github.com/Shimon1995)
