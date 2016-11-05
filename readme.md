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

Note that if you have yarn installed, our package uses this technology, so you can choose to run `yarn` instead of `npm install`. This approach is usually much faster.

__Environment__

Perform a simple `cp .env.example .env` and rewrite the `SLACK_API_TOKEN` variable with your own bot token.

__Up and running__

All that is left to do now is to run a single `node .` command and you are good to go. Log in to your slack team, invite `@lily` to your channel and type `@lily greet`!

## Features

None noteworthy, for now.

## Contribution

### Get Lily on you machine

Follow all the steps [Installation](#installation). Feel free to submit an issue if anything doesn't work. 

### Make your changes

__Modules__

When adding new functionality via _Modules_, create a new folder in the `src/Modules` direcotry and make your own `ModuleProvider`, which will extend the abstract one from the `src/Modules` directory. This forces you to implement two methods - `commands()` and `register()` - the first method determines which commands will your module react to, whereas the second one is called whenever your module should react. So far, there are two ways of registering commands your module should react to - by list of literal string or by a regex.

```javascript
/** This module will react to messages in format "@lily some ..." or "@lily strings ..."
commands() {
  return ['some', 'strings']
}
```

```javascript
/** This module will react to any messages containing the "regex" string AFTER the bot has been mentioned
commands() {
  return {
    pattern: /.* regex.*/,
  }
}
```

In the `register()` method, you will be given instances of `MessageBox` and `MessageBuilder`, which provide convenient APIs for communicating with the message received, as well as for bulding your response.

Note that a test written for each new module is required. PRs not containing a new test will not be merged.

__Kernel adjustments__

Feel free to add new functionality, as well as tinker with the present one.

Note that a test written for each new feature is required. PRs not containing a new test will not be merged.

__Clarifications__

This project follows the _airbnb_ javascript code standard. Any code not reaching to this standard will be rejected. The same goes for the situation where the new code breaks any present test. However, an _eslist_, as well as _mocha_ tasks are run each time the `gulp` command is executed - make sure to run them before making a pull request.

### Make a pull request

All of your pull requests should be submitted on the `develop` branch. Your work should be rebased with a clear description of the changes made. Whenever a pull request is submitted, Travis will be run to check code standards, as well as overall functionality of the code. You might be asked to rewrite your code opun failure.
