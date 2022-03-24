import ExpressLoader from './ExpressLoader.js';

export default class StartUpFacade {
    constructor() {
        return new ExpressLoader();
    }
}