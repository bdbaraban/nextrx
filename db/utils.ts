import { Db, MongoClient, MongoError } from 'mongodb';

let _client: MongoClient;
let _db: Db;

/**
 * Instantiate a MongoDB client.
 * @param callback {(err: MongoError) => void} - Callback function.
 */
export const connectClient = async (
  callback: (err: MongoError) => void
): Promise<void> => {
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const host = process.env.MONGODB_HOST;
  const database = process.env.MONGODB_DB;

  MongoClient.connect(
    `mongodb+srv://${user}:${password}@${host}/test?retryWrites=true`,
    { useNewUrlParser: true },
    (err, client): void => {
      _client = client;
      _db = _client.db(database);
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
