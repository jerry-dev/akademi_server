import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

export default class ExpressLoader {
    constructor() {
        const port = process.env.PORT || 3000;
        const environment = process.env.NODE_ENV;

        const app = express();

        app.use(helmet());
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));

        switch (environment) {
            case 'development':
                app.use(morgan('tiny'));
                break;
        }

        this.server = app.listen(port, () => console.info(`Listening on port ${port}...`));
    }

    get Server() {
        return this.server;
    }
}