import { Router } from 'express';
import { ObjectID } from 'mongodb';
import { getDB } from '../db/utils';
import ensureAuthenticated from './ensureAuthenticated';

const athletes = Router();

athletes.get('/api/athletes/:id', ensureAuthenticated, (req, res): void => {
  getDB()
    .collection('athletes')
    .aggregate([
      { $match: { _id: new ObjectID(req.params.id) } },
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
          password: false
        }
      }
    ])
    .toArray((_, docs): void => {
      res.send(docs[0]);
    });
});

export default athletes;
