const express = require('express');

const Games = require('../games/gamesModel');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  try {
    res.status(200).json({ message: 'GET request to / working' });
  } catch (error) {
    res.status(500).json({ message: 'error' });
  }
});

server.get('/games', async (req, res) => {
  try {
    const games = await Games.getAll();
    if (games) {
      res.status(200).json(games);
    } else {
      res.status(400).json({ message: 'no games in database' });
    }
  } catch (error) {
    res.status(500).json({ message: 'error in retrieving games' });
  }
});

server.post('/games', async (req, res) => {
  const toAdd = req.body;
  try {
    const addedGame = req.body;
    if (!addedGame.title || !addedGame.genre) {
      res.status(422).json({ message: 'please send with complete game info' });
    } else {
      const added = await Games.insert(toAdd);
      res.status(202).json(added);
    }
  } catch (error) {
    res.status(500).json({ message: 'database error' });
  }
});

module.exports = server;
