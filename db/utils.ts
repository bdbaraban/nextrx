import { Db, MongoClient, MongoError } from 'mongodb';

let _client: MongoClient;
let _db: Db;

/**
 * Instantiate a MongoDB client.
 * @param callback {(err) => void} - Error callback.
 */
export const connectClient = async (
  callback: (err: MongoError) => void
): Promise<void> => {
  MongoClient.connect(
    process.env.MONGODB,
    { useNewUrlParser: true },
    (err, client): void => {
      _client = client;
      _db = _client.db('nextrx_db');
      return callback(err);
    }
  );
};

/**
 * Fetch the MongoDB nextrx_db database.
 */
export const getDB = (): Db => _db;

/**
 * Close the MongoDB client.
 */
export const closeClient = (): void => {
  _client.close();
};
