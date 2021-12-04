export function addNewGame(newGame){
    try {
        return fetch('http://localhost:2020/addNewGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGame)
            })
    } catch (e) {
        console.log('ERROR', e);
    }
}

export function getGame(id){
    try {
        return fetch('http://localhost:2020/getGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(id)
            })
               .then(res => res.json()); 
    } catch (e) {
        console.log('ERROR', e);
    }
}

export function getAllGames() {
    try {
        return fetch('http://localhost:2020/getCount')
               .then(res => res.json());
    } catch (e) {
        console.log('ERROR:', e)
    }
}