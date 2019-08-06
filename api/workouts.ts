import { Router } from 'express';
import { ObjectID } from 'mongodb';
import { getDB } from '../db/utils';
import ensureAuthenticated from './ensureAuthenticated';

const workouts = Router();

// Fetch all workouts.
workouts.get('/api/workouts', (_, res): void => {
  getDB()
    .collection('workouts')
    .find({})
    .toArray((err, docs): void => {
      if (err) throw err;
      res.send(docs);
    });
});

// Fetch a workout with a given ID.
workouts.get('/api/workouts/:id', (req, res): void => {
  const id = req.params.id;

  getDB()
    .collection('workouts')
    .findOne({ _id: new ObjectID(id) }, (err, result): void => {
      if (err) throw err;
      res.send(result);
    });
});

// Create a new workout.
workouts.post('/api/workouts', ensureAuthenticated, (req, res): void => {
  const workout = req.body;

  getDB()
    .collection('workouts')
    .insertOne(workout, (err, result): void => {
      if (err) throw err;
      res.send(result.insertedId);
    });
});

// Update a workout.
workouts.put('/api/workouts/:id', ensureAuthenticated, (req, res): void => {
  const id = req.params.id;
  const newValues = { $set: req.body };

  getDB()
    .collection('workouts')
    .updateOne({ _id: new ObjectID(id) }, newValues, (err): void => {
      if (err) throw err;
      res.send(id);
    });
});

// Delete a workout with a given ID.
workouts.delete('/api/workouts/:id', ensureAuthenticated, (req, res): void => {
  const id = req.params.id;

  getDB()
    .collection('workouts')
    .deleteOne({ _id: new ObjectID(id) }, (err, result): void => {
      if (err) throw err;
      res.send(result.deletedCount);
    });
});

export default workouts;
