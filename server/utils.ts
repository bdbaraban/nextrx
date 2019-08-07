import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { ObjectID } from 'mongodb';
import { getDB } from '../db/utils';
import { Athlete } from '../db/types';

type DoneFunction = (
  error: any,
  user?: any,
  options?: LocalStrategy.IVerifyOptions
) => void;

/**
 * Attempt to log in an athlete with entered email/password.
 * @param email - Entered email.
 * @param password - Entered password.
 * @param done - Callback.
 */
export const login = (
  email: string,
  password: string,
  done: DoneFunction
): void => {
  getDB()
    .collection('athletes')
    .aggregate([
      { $match: { email } },
      {
        $lookup: {
          from: 'workouts',
          localField: '_id',
          foreignField: 'athlete_id',
          as: 'workouts'
        }
      },
      { $sort: { workouts: 1 } }
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

/**
 * Create a new athlete.
 * @param email - The new athlete's email.
 * @param password - The new athlete's password.
 * @param done - Callback.
 */
export const create = (
  email: string,
  password: string,
  done: DoneFunction
): void => {
  const BCRYPT_SALT_ROUNDS = 12;
  const collection = getDB().collection('athletes');

  bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(
    async (hashedPassword): Promise<void> => {
      password = hashedPassword;

      if (await collection.findOne({ email })) {
        return done(null, false, {
          message: 'Account with email already exists.'
        });
      }

      const created_at = new Date();
      const last_login = created_at;

      collection.insertOne(
        {
          email,
          password,
          created_at,
          last_login,
          first_name: '',
          last_name: '',
          profile_image_url: '',
          affiliate: '',
          email_verified: false
        },
        async (err, result): Promise<void> => {
          if (err) {
            return done(err);
          }

          if (result.insertedCount !== 1) {
            return done(null, false, { message: 'Failed to create account.' });
          }

          const athlete = await collection.findOne({ _id: result.insertedId });

          return done(null, athlete);
        }
      );
    }
  );
};

/**
 * Update an athlete's profile.
 * @param _id - The athlete's ID.
 * @param values - New attributes for the athlete.
 * @param done - Callback.
 */
export const update = (
  _id: string,
  attributes: Partial<Athlete>,
  done: DoneFunction
): void => {
  const collection = getDB().collection('athletes');

  collection.updateOne(
    { _id: new ObjectID(_id) },
    { $set: attributes },
    async (err, result): Promise<void> => {
      if (err) {
        return done(err);
      }

      if (result.modifiedCount !== 1) {
        return done(null, false, { message: 'Failed to update athlete.' });
      }

      return done(null, true);
    }
  );
};

/**
 * Verify an athlete's email.
 * @param email - The athlete's email.
 * @param done - Callback.
 */
export const verify = (email: string, done: DoneFunction): void => {
  getDB()
    .collection('athletes')
    .updateOne(
      { email },
      { $set: { email_verified: true } },
      (err, result): void => {
        if (err) {
          return done(err);
        }

        if (result.modifiedCount !== 1) {
          return done(null, false, {
            message: 'Unable to mark athlete as verified.'
          });
        }

        done(null, true);
      }
    );
};

/**
 * Change an athlete's password.
 * @param _id - The athlete's ID.
 * @param newPassword - The athlete's new password.
 * @param done - Callback.
 */
export const changePassword = (
  _id: string,
  newPassword: string,
  done: DoneFunction
): void => {
  const BCRYPT_SALT_ROUNDS = 12;
  const collection = getDB().collection('athletes');

  bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS).then(
    async (hashedPassword): Promise<void> => {
      collection.updateOne(
        { _id: new ObjectID(_id) },
        { $set: { password: hashedPassword } },
        (err, result): void => {
          if (err) {
            return done(err);
          }

          if (result.modifiedCount !== 1) {
            return done(null, false, {
              message: 'Unable to change athlete password.'
            });
          }

          done(null, true);
        }
      );
    }
  );
};
