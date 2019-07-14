import { Router } from 'express';
import { getDB } from '../db/utils';

const athletes = Router();

athletes.get('/api/athletes', (_, res): void => {
  getDB()
    .collection('athletes')
    .aggregate([
      { $match: { last_name: 'Baraban' } },
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
