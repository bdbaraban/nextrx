import { Router } from 'express';
import { ObjectID } from 'mongodb';
import { getDB } from '../db/utils';

const lifts = Router();

// Fetch all lifts.
lifts.get('/api/lifts', (_, res): void => {
  getDB()
    .collection('lifts')
    .find({})
    .toArray((err, docs): void => {
      if (err) throw err;
      res.send(docs);
    });
});

// Fetch a lift with a given ID.
lifts.get('/api/lifts/:id', (req, res): void => {
  const id = req.params.id;

  getDB()
    .collection('lifts')
    .findOne({ _id: new ObjectID(id) }, (err, result): void => {
      if (err) throw err;
      res.send(result);
    });
});

// Create a new lift.
lifts.post('/api/lifts', (req, res): void => {
  const lift = {
    created_at: new Date(),
    name: req.body.name
  };

  getDB()
    .collection('lifts')
    .insertOne(lift, (err, result): void => {
      if (err) throw err;
      res.send(result.insertedId);
    });
});

// Delete a lift with a given ID.
lifts.delete('/api/lifts/:id', (req, res): void => {
  const id = req.params.id;

  getDB()
    .collection('lifts')
    .deleteOne({ _id: new ObjectID(id) }, (err, result): void => {
      if (err) throw err;
      res.send(result.deletedCount);
    });
});

export default lifts;
