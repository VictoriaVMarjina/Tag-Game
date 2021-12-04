class Model {
    constructor(){
        this.db = [];
        this.newDb = [];
        this.currentButtonValue = null;
    }

    init = () => {
        this.db = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12], 
            [13, 14, 15, 0]
        ]
    }

    checkoutDb = cb => {
        this.db.forEach(Element => {
            cb(Element);
        });
    }

    checkoutNewDb = cb => {
        this.newDb.forEach(Element => {
            cb(Element);
        });
    }

    getPosition = buttonValue => {
        for( let i = 0; i < 4; i++) {
            let position = this.newDb[i].indexOf(buttonValue);
                if(position !== -1) {
                    let positionDb = [i, position];
                    
                    return positionDb;
                }
        }
    }

    createNewDb = () => {
        this.newDb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(function() { return Math.random()-.5; }).concat(0);
            if (!this.checkNewDb(this.newDb)){
                this.swapNumbersInDb(0, 1);
            }
         
        this.newDb = [this.newDb.slice(0, 4), this.newDb.slice(4, 8), this.newDb.slice(8, 12), this.newDb.slice(12)];
    }

    swapNumbersInDb = (i1, i2) => { 
        let firstNumb = this.newDb[i1]; 
        this.newDb[i1] = this.newDb[i2]; 
        this.newDb[i2] = firstNumb;
    }
    
    checkNewDb = db => {
        for (let kDisorder = 0, i = 1, len = db.length-1; i < len; i++){
            for (let j = i-1; j >= 0; j--){
                if (db[j] > db[i]){
                    kDisorder++;
                }else{
                    return !(kDisorder % 2); 
                }
            }
        }   
    }    
    
    checkZeroPosition = position => {
        let i = position[0];
        let j = position[1];
        if( i != 3 && this.newDb[i + 1][j] == 0) {
            return true;
        } else if( i != 0 && this.newDb[i - 1][j] == 0) {
            return true;
        } else if(this.newDb[i][j + 1] == 0) {
            return true;
        } else if(this.newDb[i][j - 1] == 0) {
            return true;
        } else {
            return false;
        }
    }

    changePositionInDb = (elementPosition, zeroPosition) => {
        let currElemPosition = this.newDb[elementPosition[0]][elementPosition[1]];
        this.newDb[elementPosition[0]][elementPosition[1]] = 0;
        this.newDb[zeroPosition[0]][zeroPosition[1]] = currElemPosition;
        let result = this.compareDatabases();
            
        return result;
    }

    compareDatabases = () => {
        if(this.newDb.join() == this.db.join()){

            return true;
        }else{

            return false;
        }
    }

    clearCurrentDb = () => {
        this.newDb = [];
    }

    changeDb = db => {

        this.newDb = db;
    }

    getCurrentPositionOfNumbers = () => { return this.newDb; }
}

export default Model;