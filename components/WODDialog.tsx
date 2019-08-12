import React from 'react';
import { Box, Button, Heading } from 'grommet';
import { Add, Close, AddCircle, SubtractCircle } from 'grommet-icons';
import { Movement, Workout } from '../db/types';
import { IconButton, WODForm } from '.';

/**
 * WODDialog component prop types
 */
interface WODDialogProps {
  toggleOpen: VoidFunction;
  date: Date;
  workout: Workout | undefined;
}

/**
 * Dialog component for adding/editing workouts
 */
const WODDialog = ({
  toggleOpen,
  date,
  workout
}: WODDialogProps): React.ReactElement => {
  const newMovement = (movement: Movement): Movement => {
    let template = {
      score_type: 'reps',
      score: '',
      minutes: 1,
      rounds: 1,
      description: '',
      rx: false,
      lift: '',
      scheme: {
        rounds: '',
        reps: ''
      },
      one_rep_max: false
    };
    return Object.assign({}, template, movement);
  };

  const [movements, setMovements] = React.useState<Movement[]>(
    workout === undefined || workout.movements.length === 0
      ? [newMovement({})]
      : workout.movements.map((m: Movement): Movement => newMovement(m))
  );

  const handleUpdate = (update: Partial<Movement>, index: number): void => {
    let tmp = [...movements];
    tmp[index] = Object.assign({}, movements[index], update);
    setMovements(tmp);
  };

  const handlePost = (): void => {
    let toSubmit = [];

    for (let movement of movements) {
      let tmp = {
        score_type: movement.score_type,
        score: movement.score
      };

      if (movement.score_type === 'load') {
        tmp['lift'] = movement.lift;
        tmp['scheme'] = movement.scheme;
        tmp['one_rep_max'] = movement.one_rep_max;
      } else {
        tmp['description'] = movement.description;
        tmp['rx'] = movement.rx;
        if (movement.score_type === 'reps') {
          tmp['minutes'] = movement.minutes;
        } else if (movement.score_type === 'time') {
          tmp['rounds'] = movement.rounds;
        }
      }
      toSubmit.push(tmp);
    }
    console.log(toSubmit);
  };

  return (
    <Box fill flex justify="start" align="center" overflow="auto">
      <Box
        fill="horizontal"
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="accent-1"
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      >
        <Button a11yTitle="close" icon={<Close />} onClick={toggleOpen} />
        <Button
          a11yTitle="post"
          primary
          label="Post"
          icon={<Add />}
          onClick={handlePost}
        />
      </Box>
      <Box
        flex
        align="center"
        height="min-content"
        width="medium"
        margin={{
          right: 'large',
          left: 'large',
          top: 'medium',
          bottom: 'large'
        }}
      >
        <Heading level="3" textAlign="center" margin="small">
          WOD {date.getMonth()}/{date.getDate()}/{date.getFullYear()}
        </Heading>
        {movements.map(
          (movement: Movement, index: number): React.ReactElement => (
            <WODForm
              key={index}
              movement={movement}
              index={index}
              handleUpdate={handleUpdate}
            />
          )
        )}
        <Box direction="row" justify="center" align="center" margin="medium">
          {movements.length > 1 && (
            <IconButton
              animation="hover"
              icon={<SubtractCircle size="medium" color="accent-1" />}
              onClick={(): void =>
                setMovements(movements.slice(0, movements.length - 1))
              }
            />
          )}
          {movements.length < 4 && (
            <IconButton
              animation="hover"
              icon={<AddCircle size="medium" color="accent-1" />}
              onClick={(): void =>
                setMovements([...movements, newMovement({})])
              }
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default WODDialog;
