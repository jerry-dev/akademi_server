import config from 'config';
import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;

const dbURL = `${config.get('database.host')}:${config.get('database.port')}`;
const database = config.get('database.dbName');

export default class StudentModel {
    async find() {
        let client;

        try {
            client = await MongoClient.connect(dbURL, { useUnifiedTopology: true });
            console.info(`SUCCESSFULLY CONNECTED TO THE ${database}`);
            const students = client.db(database).collection('students');
            return await students.find().toArray();
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
            const students = client.db(database).collection('students');
            return await students.find(query).toArray();
        } catch (error) {
            console.info(`SUCCESSFULLY CONNECTED TO THE ${database}`);
        } finally {
            if (client) {
                client.close();
            }
        }
    }
}