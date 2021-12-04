import * as api from  './Rest';

class Controller {
    constructor (view, model) {
        this.view = view;
        this.model = model;
        this.newGameId = null;
        this.curentButtonValue = null;
    }
    
    init = () => {
        this.view.init();
        this.view.createGameboard()
        this.model.init();
        this.model.checkoutDb(this.printDb.bind(this));
        this.view.clickGameBoardElement(this.clickGameElement.bind(this));
        this.view.createNewPositionsForNumber(this.printNewDb.bind(this));
        this.view.activateSaveButton(this.saveAllInfoAboutGame.bind(this));
        this.getInfoAboutAllGames();
    }
    
    printNewDb = (moves, timer) => {
        this.model.createNewDb();
        this.view.deleteBoard();
        this.model.checkoutNewDb(this.printDb.bind(this));
        this.view.onOffTimer();
        this.saveAllInfoAboutGame(moves, timer);
    }
    
    printDb = Element => {
        this.view.createTr({ className: 'table__table-line', id: 'table-line', text: Element });
    }
    
    clickGameElement = targetBut => {
        this.curentButtonValue = +targetBut;
        const elementPosition = this.model.getPosition(this.curentButtonValue);
        const zeroPosition = this.model.getPosition(0);
        let isCheck = this.model.checkZeroPosition(elementPosition);
        let result;
        if(isCheck){
            result = this.model.changePositionInDb(elementPosition, zeroPosition);
            this.incrementMoves();
            this.view.deleteBoard();
            this.model.checkoutNewDb(this.printDb.bind(this));
        }
        
        if(result){
            this.view.deleteBoard();
            this.model.checkoutDb(this.printDb.bind(this));
            this.model.clearCurrentDb();
            this.view.stopTimer();
        }
    }
    
    incrementMoves = () => {
        let newMoves = this.view.getMoves();
        newMoves++;
        this.view.setMoves(newMoves);
    }

    incrementId = () => {
        this.newGameId++;
    }
    
    saveAllInfoAboutGame = (moves, timer) => {
        if(moves!= 0){
            const numbPosition = this.model.getCurrentPositionOfNumbers();
            this.incrementId();
            const gameInfo = { id: this.newGameId, numbersPosition: numbPosition, moves: moves, timer: timer };
            api.addNewGame(gameInfo).then(this.getInfoAboutAllGames());
        }
    }

    getInfoAboutAllGames = () => {
        api.getAllGames()
            .then(count => {
                if(count.count !== 0){
                    this.view.createSavedList(count.count, { className: 'foot-list', id: 'foot-list' });
                    this.view.activSavedList(this.getInfoAboutGame.bind(this));
                }
            });
    }

    getInfoAboutGame = id => {
        api.getGame({ id })
            .then(game => {
                console.log('game', game);
                this.model.changeDb(game.numbersPosition);
                this.view.startSavedGameTimer(game.timer);
                this.view.setMoves(game.moves);
            });
    }
}

export default Controller;