# HSDecker

A simple tool to view cards and decks for the digital collectible card game Hearthstone.

## Features

- create and show random deck
- show a deck by a given deck code
- show cards
- user can login and save their card collection

![Screenshot](static/img/screenshot.png?raw=true)

## Why

- since there is no way to manually maintain my card collection on HSReplay and there is no way of
  syncing on iOS, I wanted to have a tool to check missing cards for a given deck code
- have a look into [Svelte](https://svelte.dev/) (in combination with [Sapper](https://sapper.svelte.dev)
  for server side rendering)
- have a look into [Google Firebase](https://firebase.google.com/)

## Prerequirements

- git
- node.js
- yarn
- a firebase project

## Setup

- clone the repo to you local machine (`git clone --recursive url-to-repository`)
- go to the directory
- install node modules (just run `yarn`)
- copy `firebase.config.js.example` to `firebase.config.js` and enter your firebase project credentials
  in the new file
- update submodules (`git submodule update --recursive`) (in case you didn't cloned with `--recusinve`)

### Setup Firebase

- the app needs a collection named `userCards`
- rule for this collection:
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /userCards/{userId} {
        allow read, write: if request.auth.uid == userId;
      }
    }
  }
  ```
  this allows users to just access their own collection, not other users collections

## Run

`yarn dev`

Then open up [localhost:3000](http://localhost:3000) and start clicking around.

## Tasks

- update tiles
  - `git submodule update --recursive`
- update card databse
  - `yarn download-card-db`
