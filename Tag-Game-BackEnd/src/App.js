const express = require('express');
const path = require('path');

class App {
    constructor(db) {
        this._db = db;

        this._app = express();
        this._app.use(express.json());
        this._app.use('/', express.static(path.resolve(__dirname, '../public')));

        this._app.get('/getCount', this.onGetAllGames);
        this._app.post('/getGame', this.onGetGame);
        this._app.post('/addNewGame', this.onSaveNewGame);
    }

    onGetAllGames = (req, res) => {
        const  count = this._db.getGamesCount();
     
        res.send({ count });
        res.end();
    }

    onGetGame = (req, res) => {
        const { body } = req;
        const game = this._db.getGame(body.id);
        console.log(game);

        res.send( game );
        res.end();
    }

    onSaveNewGame = (req, res) => {
        const { body } = req;

        this._db.saveNewGame(body);
        res.end();
    }

    getApp = () => this._app;
}

module.exports = App;
