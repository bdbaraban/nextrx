import LocalStrategy from 'passport-local';
import { getDB } from '../db/utils';
import bcrypt from 'bcrypt';
import { Athlete } from '../db/types';

type DoneFunction = (
  error: any,
  user?: any,
  options?: LocalStrategy.IVerifyOptions
) => void;

export const login = (
  email: string,
  password: string,
  done: DoneFunction
): void => {
  console.log('verifying');
  getDB()
    .collection('athletes')
    .aggregate([
      { $match: { email } },
      {
        $lookup: {
          from: 'affiliates',
          localField: 'affiliate_id',
          foreignField: '_id',
          as: 'affiliate'
        }
      },
      { $unwind: '$affiliate' },
      {
        $lookup: {
          from: 'workouts',
          localField: '_id',
          foreignField: 'athlete_id',
          as: 'workouts'
        }
      },
      {
        $project: {
          affiliate_id: false
        }
      }
    ])
    .toArray(
      async (err, docs): Promise<void> => {
        const athlete = docs[0];
        if (err) {
          return done(err);
        }
        if (!athlete) {
          return done(null, false, { message: 'Athlete not found.' });
        }

        const samePassword = await bcrypt.compare(password, athlete.password);

        if (!samePassword) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, athlete);
      }
    );
};

export const create = (athlete: Athlete, callback): void => {
  const BCRYPT_SALT_ROUNDS = 12;
  const collection = getDB().collection('athletes');

  bcrypt
    .hash(athlete.password, BCRYPT_SALT_ROUNDS)
    .then(function(hashedPassword): void {
      athlete.password = hashedPassword;
      collection.insertOne(athlete, (err, result): void => {
        if (err) {
          return callback(err);
        }
        if (result.insertedCount !== 1) {
          return callback('Athlete not inserted.');
        }
        callback(null);
      });
    });
};

export const verify = (email: string, callback): void => {
  getDB()
    .collection('athletes')
    .updateOne(
      { email },
      { $set: { email_verified: true } },
      (err, result): void => {
        if (err) return callback(err);
        if (result.modifiedCount !== 1)
          return callback('Unable to mark athlete as verified.');

        callback(null, true);
      }
    );
};

export const changePassword = (
  email: string,
  newPassword: string,
  callback
): void => {
  const BCRYPT_SALT_ROUNDS = 12;

  const hashPassword = async (newPassword: string): Promise<void> => {
    const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);
    getDB()
      .collection('athletes')
      .updateOne(
        { email },
        { $set: { password: hashedPassword } },
        (err, result): void => {
          if (err) {
            return callback(err);
          }
          if (result.modifiedCount !== 1) {
            return callback('Unable to change athlete password.');
          }

          callback(null, true);
        }
      );
  };

  hashPassword(newPassword);
};
