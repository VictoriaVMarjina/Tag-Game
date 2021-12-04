const App = require('./App');
const Server = require('./Server');

const Model = require('./model/Model');

function init() {
    const port = 2020 || process.env.PORT;

    const db = new Model();
    const app = new App(db);
    const server = new Server(port, app)

    server.start();
}

init();
