# [Adventure Capitalist Clone](https://github.com/castroarguello/adventure-capitalist-clone) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react)

## Coding challenge

The coding challenge consists in implementing an [Adventure Capitalist](http://en.gameslol.net/adventure-capitalist-1086.html) clone using JS.

The proposed solution implements a full-stack game clone using [Meteor](https://github.com/meteor/meteor) which will give us the ability to create a scalable web application that could be ported easily to other platforms.

Meteor framework was selected for its scaffolding simplicity, because it provides out of the box methods for back-end communication through sockets and full-stack reactivity. It integrates the UI (among other options) with a custom nodeJS backend and [mongoDB](https://www.mongodb.com/).

The React library was selected because of its increasing market share.

## Architectural concerns

While the chosen architecture allows quick prototyping, it would probably be better to refactor into a more decoupled architecture, allowing the execution of the game in the UI without constantly updating to the server, for obvious performance reasons. 

There are also some issues with the reactive components when playing with managers: given that the player cash increases automatically, all business componets are rendered too often which sometimes leads to errors when trying to update unmounted components.

Similar result could be achieved using a different, probably more decoupled stack such as a React UI communicating with REST endpoints mounted over an Express or Restify powered back-end.

Another design concern that should be improved in future releases are the correct storage of games in current execution so the UI can display the remaining time accurately. 

## Features implemented

- Buy and upgrade business.
- Run business and earn money.
- Hire managers to run business automatically.
- Businesses continue to make money while the user is away.

## Quick start:

- git clone https://github.com/castroarguello/adventure-capitalist-clone
- cd adventure-capitalist-clone

### Option 1: Install Meteor locally:

- curl https://install.meteor.com/ | sh
- cd adventure-capitalist-clone/app
- meteor run

### Option 2: Start docker container:

- cd adventure-capitalist-clone/
- docker-compose up

Access http://localhost:3000 in the browser.
