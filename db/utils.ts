import { Db, MongoClient, MongoError } from 'mongodb';

let _client: MongoClient;
let _db: Db;

export const connectClient = async (
  uri: string,
  callback: (err: MongoError) => void
): Promise<void> => {
  MongoClient.connect(uri, { useNewUrlParser: true }, (err, client): void => {
    _client = client;
    _db = _client.db('nextrx_db');
    return callback(err);
  });
};

export const getDB = (): Db => _db;

export const closeClient = (): void => {
  _client.close();
};
