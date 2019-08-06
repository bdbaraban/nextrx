import { Router } from 'express';
import { ObjectID } from 'mongodb';
import { getDB } from '../db/utils';
import ensureAuthenticated from './ensureAuthenticated';

const athletes = Router();

// Fetch all athletes.
athletes.get('/api/athletes', (_, res): void => {
  getDB()
    .collection('athletes')
    .find({}, { projection: { password: 0 } })
    .toArray((err, docs): void => {
      if (err) throw err;
      res.send(docs);
    });
});

// Fetch an athlete with a given ID.
athletes.get('/api/athletes/:id', (req, res): void => {
  const id = req.params.id;

  getDB()
    .collection('athletes')
    .findOne({ _id: new ObjectID(id) }, (err, result): void => {
      if (err) throw err;
      delete result.password;
      res.send(result);
    });
});

// Fetch all workouts for an athlete with a given ID.
athletes.get('/api/athletes/:id/workouts', (req, res): void => {
  const id = req.params.id;

  getDB()
    .collection('workouts')
    .find({ athlete_id: new ObjectID(id) })
    .toArray((err, docs): void => {
      if (err) throw err;
      res.send(docs);
    });
});

// Update an athlete.
athletes.put('/api/athletes/:id', ensureAuthenticated, (req, res): void => {
  const id = req.params.id;
  const newValues = { $set: req.body };

  getDB()
    .collection('athletes')
    .updateOne({ _id: new ObjectID(id) }, newValues, (err): void => {
      if (err) throw err;
      res.send(id);
    });
});

// Delete an athlete with a given ID.
athletes.delete('/api/athletes/:id', ensureAuthenticated, (req, res): void => {
  const id = req.params.id;

  getDB()
    .collection('athletes')
    .deleteOne({ _id: new ObjectID(id) }, (err, result): void => {
      if (err) throw err;
      res.send(result.deletedCount);
    });
});

export default athletes;
