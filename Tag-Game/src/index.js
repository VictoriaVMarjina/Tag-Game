import './style.less';
import Controller from './controller/Controller';
import View from './view/View';
import Model from './model/Model';

function init () {
    const view = new View();
    const model = new Model();
    const controller = new Controller(view, model);
    
    controller.init();
}

init();