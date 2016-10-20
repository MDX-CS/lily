# Lily - the ultimate Slack bot

Open source MDX project - meet Lily.

[![Build Status](https://travis-ci.org/MDX-CS/lily.svg?branch=master)](https://travis-ci.org/MDX-CS/lily)

## Contents

- [Installation](#installation)
- [Features](#features)
- [Contribution](#contribution)

## Installation

__Node__

First you need to get [Node.js](https://nodejs.org/en/) onto your machine. You can use a simple `sudo apt-get install npm` if you are a Linux user.

__Dependencies__

Feel free to clone the repository anywhere on your computer. Open up your console and `cd` in the repo directory. Run `npm install` and wait for the dependencies to be installed. Then run the `gulp` command so all the source files can compile.

Not that if you have yarn installed, our package uses this technology, so everything you need to do is run `yarn`. And proceed with `gulp`.

__Environment__

Perform a simple `cp .env.example .env` and rewrite the `SLACK_API_TOKEN` variable with your own bot token.

__Up and running__

All that is left to do now is to run a single `node .` command and you are good to go. Log in to your slack team, invite `@lily` to your channel and type `@lily greet`!

## Features

None noteworthy, for now.

## Contribution

Feel free to fork this repository and contribute via PRs. I will update the contribution guide ASAP.
