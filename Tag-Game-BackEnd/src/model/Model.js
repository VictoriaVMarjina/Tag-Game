class Model {
    constructor() {
        this.games = [];
    }

    getGames = () => this.games;

    saveNewGame = newGame => {
        this.games.push(newGame);
    }

    getGamesCount = () => {
        const count = this.games.length;

        return count;
    }

    getGame = id => {
        this.games.forEach(element => {
            if(element.id == id){
                
               return element;
            }
        });
    }
}

module.exports = Model;
