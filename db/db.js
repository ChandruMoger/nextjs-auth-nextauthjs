import { MongoClient } from 'mongodb';

export const connectToDb = async () => {
    const client = MongoClient.connect('mongodb://localhost:27017/');

    return client;
}