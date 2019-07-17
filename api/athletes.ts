import { Router } from 'express';
import { getDB } from '../db/utils';
import { ensureAuthenticated } from './';

const athletes = Router();

athletes.get('/api/athletes/:email', ensureAuthenticated, (req, res): void => {
  const email = req.params.email;

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
          password: false,
          affiliate_id: false
        }
      }
    ])
    .toArray((_, docs): void => {
      res.send(docs[0]);
    });
});

export default athletes;
