import { NextFunction } from 'express';
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

interface CreateParams {
  email: string;
  password: string;
}

/**
 * Create a new athlete.
 * @param body - Email and password for the new athlete.
 * @param done - Callback.
 */
export const create = (
  { email, password }: CreateParams,
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
 * @param values - New attributes for the athlete.
 * @param done - Callback.
 */
export const update = (values: Partial<Athlete>, done: DoneFunction): void => {
  const { _id, ...attributes } = values;
  const id = new ObjectID(_id);
  const collection = getDB().collection('athletes');

  collection.updateOne(
    { _id: id },
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

export const verify = (email: string, next: NextFunction): void => {
  getDB()
    .collection('athletes')
    .updateOne(
      { email },
      { $set: { email_verified: true } },
      (err, result): void => {
        if (err) {
          return next(err);
        }

        if (result.modifiedCount !== 1) {
          return next('Unable to mark athlete as verified.');
        }

        next(null);
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
