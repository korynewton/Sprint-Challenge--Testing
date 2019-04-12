const db = require('../data/dbConfig');

const Games = require('./gamesModel');

describe('Games model testing', () => {
  beforeEach(async () => {
    await db('games').truncate();
  });
  it('insert() tests', async () => {
    await Games.insert({ title: 'Call of Duty', genre: '1st person shooter' });
    await Games.insert({ title: 'Starfox', genre: 'N64 Classic' });

    const games = await db('games');

    expect(games).toHaveLength(2);
  });

  it('should insert the correct game', async () => {
    let game = await Games.insert({
      title: 'Super Smash Bros',
      genre: 'fighting',
    });
    expect(game.title).toBe('Super Smash Bros');

    game = await Games.insert({ title: 'Fifa', genre: 'Sports' });
    expect(game.title).toBe('Fifa');
  });
  it('getAll test', async () => {
    await Games.insert({ title: 'Call of Duty', genre: '1st person shooter' });
    await Games.insert({ title: 'Starfox', genre: 'N64 Classic' });

    const games = await Games.getAll();

    expect(games).toHaveLength(2);
  });
});
