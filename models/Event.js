import config from 'config';
import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
const dbURL = `${config.get('database.host')}:${config.get('database.port')}`;
const database = config.get('database.dbName');

export default class EventModel {
    async find() {
        let client;

        try {
            client = await MongoClient.connect(dbURL, { useUnifiedTopology: true });
            console.info(`SUCCESSFULLY CONNECTED TO ${database}`);
            const events = client.db(database).collection('events');
            return await events.find().toArray();
        } catch (error) {
            console.error(`CONNECTION FAILED: ${error.message}`);
        } finally {
            if (client) {
                client.close();
            }
        }
    }

    async findBy(criteria) {
        let query = [{$match: criteria}];
        let client;

        try {
            client = await MongoClient.connect(dbURL, { useUnifiedTopology: true });
            console.info(`SUCCESSFULLY CONNECTED TO THE ${database}`);
            const events = client.db(database).collection('events');
            return await events.aggregate(query);
        } catch (error) {
            console.info(`SUCCESSFULLY CONNECTED TO THE ${database}`);
        } finally {
            if (client) {
                client.close();
            }
        }
    }
}