class View {
    constructor () {
        this.root = null;
        this.timer = null;
        this.savedList = null;
        this.gameTable = null;
        this.saveButton = null;
        this.startButton = null;
        this.topContainer = null;
        this.currentTimer = null; 
        this.footContainer = null;
        this.mainContainer = null;
        this.tableContainer = null;
        this.movesCalculator = null;
    }

    init = () => {
        this.root = document.getElementById('root');
        this.timer = this.createTimer({ className: 'main__container-timer', id: 'container-timer' });
        this.startButton = this.createButton({className: 'main__container-start', id: 'container-start'});
        this.topContainer = this.createDiv({ className: 'top-container', id: 'top-container'});
        this.mainContainer = this.createDiv({ className: 'root__main-container', id: 'main-container' });
        const movesDiv = this.createCalculator({ className: 'main__container-moves', id: 'container-moves' });
        this.saveButton = this.createButton({ className: 'main__container-save', id: 'root-save' });
        this.saveButton.innerHTML = 'Save';
        this.footContainer = this.createDiv({ className: 'root__foot-container', id: 'foot-container' });

        
        this.timer.style.borderStyle = 'solid';
        this.timer.style.width = '100px';
        movesDiv.style.borderStyle = 'solid';

        this.topContainer.append(movesDiv);
        this.topContainer.append(this.timer);
        this.mainContainer.append(this.topContainer);
        this.mainContainer.append(this.startButton);
        this.root.append(this.mainContainer);
    }

    activateSaveButton = cb => {
        this.saveButton.addEventListener('click', () => {
            cb(this.movesCalculator.innerText, this.currentTimer);  
        });
    }

    activSavedList = cb => {
        this.savedList.addEventListener('click', event => {
            cb(event.target.id);
        });
    }


    createNewPositionsForNumber = cb => {
        this.startButton.addEventListener('click', () => {
            cb(this.movesCalculator.innerText, this.currentTimer);  
            this.resetMoves();
        });
    }

    createDiv = props => {
        const div = document.createElement('div');
        props.id && (div.id = props.id);
        props.className && (div.className = props.className);

        return div;
    }

    startTimer = () => {
        this.timerId = setInterval(() => {
            this.milSec++;
            
            if(this.milSec == 10) {
                this.milSec = 0;
                this.sec++;
            } else if(this.sec == 60) {
                this.sec = 0;
                this.min++;
            } else if(this.min === 60) {
                this.min = 0;
                this.hou++;
            }

            if(this.milSec <= 9) {
                this.milSec = "0" + this.milSec;
            }
            
            this.millisec.innerText = this.milSec;
            this.second.innerText = this.sec + ':';
            this.minute.innerText = this.min + ':';
            this.hour.innerText = this.hou + ':';
            this.currentTimer = this.hour.innerText + this.minute.innerText + this.second.innerText + this.millisec.innerText;
        }, 100);
    }

    onOffTimer = () => {
        this.hour.innerText = '00' + ':';
        this.second.innerText = '00' + ':';
        this.minute.innerText = '00' + ':';
        this.millisec.innerText = '00';
        this.hou = 0;
        this.min = 0;
        this.sec = 0;
        this.milSec = 0;
        this.currentTimer = this.hour.innerText + this.minute.innerText + this.second.innerText + this.millisec.innerText;
        clearInterval(this.timerId);
        this.startTimer();
    }

    stopTimer = () => {
        clearInterval(this.timerId);
    }

    startSavedGameTimer = timer => {
        let timerElement = timer.split(':');
        this.hou = +timerElement[0];
        this.min = +timerElement[1];
        this.sec = +timerElement[2];
        this.milSec = +timerElement[3];
        startTimer();
    }

    createTimer = props => {
        this.hour = document.createElement('span')
        this.minute = document.createElement('span');
        this.second = document.createElement('span');
        this.millisec = document.createElement('span');
        const timerDiv = this.createDiv({ className: 'main__time-container', id: 'time-container' })

        this.hour.innerText = '00' + ':';
        this.second.innerText = '00' + ':';
        this.minute.innerText = '00' + ':';
        this.millisec.innerText = '00';
        this.currentTimer = this.hour.innerText + this.minute.innerText + this.second.innerText + this.millisec.innerText;

        timerDiv.append(this.hour);
        timerDiv.append(this.minute);
        timerDiv.append(this.second);
        timerDiv.append(this.millisec);
                
        props.id && (timerDiv.id = props.id);
        props.className && (timerDiv.className = props.className);


        return timerDiv;
    }

    createButton = props => {
        const start = document.createElement('button');
        
        start.innerText = 'Let`s go!';

        props.id && (start.id = props.id);
        props.className && (start.className = props.className);

        return start;
    }

    createCalculator = props => {
        const movesDiv = this.createDiv({className: 'moves-container', id: 'moves-container'})
        this.movesCalculator = document.createElement('span');

        this.movesCalculator.innerText = '0';
        movesDiv.append(this.movesCalculator);

        props.id && (this.movesCalculator.id = props.id);
        props.className && (this.movesCalculator.className = props.className);

        return movesDiv;
    }

    getMoves = () => {
        let numberOfMoves = this.movesCalculator.innerText;
        
        return numberOfMoves;
    }

    setMoves = value => {
        this.movesCalculator.innerText = value;
    }

    resetMoves = () => {
        this.movesCalculator.innerText = 0;
    }

    createGameboard = () => {
        this.gameTable = this.createTable({ className: 'main__game-table', id: 'game-table' });
        this.tableContainer = this.createDiv({ className: 'root__table-container', id: 'table-container' });

        this.tableContainer.append(this.gameTable);
        this.root.append(this.tableContainer);
        this.root.append(this.footContainer);
        this.root.append(this.saveButton);
    }

    clickGameBoardElement = (cb) => {
        this.gameTable.addEventListener('click', event => {
            if(event.path[0].id === 'table-element') {
                cb(event.target.textContent);
            }
        });
    }

    createTable = props => {
        const table = document.createElement('table')
        props.className && (table.className = props.className);
        props.id && (table.id = props.id);

        table.style.border = 'solid';
        table.style.height = '250px';
        table.style.width = '250px';

        return table;
    }

    createTd = props => {
        const tableTd = document.createElement('td');
        props.className && (tableTd.id = props.className);
        props.id && (tableTd.id = props.id);
        props.tdText && (tableTd.innerText = props.tdText);
        
        tableTd.style.border = 'solid';
        tableTd.style.height = '50px';
        tableTd.style.width = '50px';
        tableTd.style.bgcolor = 'red';

        return tableTd;
    }

    createTr = props => {
        const tableTr = document.createElement('tr');
        props.className && (tableTr.id = props.className);
        props.id && (tableTr.id = props.id);

        tableTr.style.color = 'white';

        const gameTableElement1 = this.createTd({className: 'table__table-element', id: 'table-element', tdText: props.text[0]});
        const gameTableElement2 = this.createTd({className: 'table__table-element', id: 'table-element', tdText: props.text[1]});
        const gameTableElement3 = this.createTd({className: 'table__table-element', id: 'table-element', tdText: props.text[2]});
        const gameTableElement4 = this.createTd({className: 'table__table-element', id: 'table-element', tdText: props.text[3]});
        
        tableTr.append(gameTableElement1);
        tableTr.append(gameTableElement2);
        tableTr.append(gameTableElement3);
        tableTr.append(gameTableElement4);
        this.gameTable.append(tableTr);
    }

    deleteBoard = () => {
        this.gameTable.innerHTML = '';
    }

    createSavedList = (gamesCount, props) => {
        this.footContainer.innerHTML = '';

        this.savedList = document.createElement('ul');

        props.className && (this.savedList.className = props.className);
        props.id && (this.savedList.id = props.id);

        this.footContainer.append(this.savedList);

        this.savedList.style.backgroundColor = 'white';
        this.savedList.style.width = '100px';

        for(let i = 1; i <= gamesCount; i++){
            const li = this.createSavedElement({ id: i, className: 'list__game-numb'});
            this.savedList.append(li);
        }
    }

    createSavedElement = props => {
        const li = document.createElement('li');

        props.className && (li.className = props.className);
        props.id && (li.innerText = props.id);
        props.id && (li.id = props.id);

        return li;
    }
}

export default View;