import React from 'react';
import { Layer, Text } from 'grommet';
import { Card, IconButton } from 'grommet-controls';
import { AddCircle } from 'grommet-icons';
import NewWorkoutBox from './NewWorkoutBox';
import { Athlete, Movement, Workout } from '../db/types';

interface WorkoutCardProps {
  athlete: Athlete;
  date: Date;
}

const WorkoutCard = ({
  athlete,
  date
}: WorkoutCardProps): React.ReactElement => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [workout, setWorkout] = React.useState<Workout | undefined>(undefined);

  React.useEffect((): void => {
    setWorkout(
      athlete.workouts.find((workout: Workout): boolean => {
        const current = new Date(workout.date);
        return (
          current.getFullYear() === date.getFullYear() &&
          current.getMonth() === date.getMonth() &&
          current.getDate() === date.getDate()
        );
      })
    );
  }, [athlete, date]);

  const toggleOpen = (): void => {
    setOpen(!open);
  };

  const generic = 'No workouts posted for this day.';

  return (
    <>
      <Card basis="medium">
        <Card.CardTitle direction="row" justify="between">
          <Text>
            {date.getMonth()}/{date.getDate()}/{date.getFullYear()}
          </Text>
          <IconButton
            a11yTitle="Post new workout button"
            icon={<AddCircle color="accent-1" size="medium" />}
            onClick={toggleOpen}
          />
        </Card.CardTitle>
        <Card.CardContent>
          {workout ? (
            workout.movements.map(
              (movement: Movement): React.ReactElement => (
                <Text key={Math.random()}>{movement.score_type}</Text>
              )
            )
          ) : (
            <Text>{generic}</Text>
          )}
        </Card.CardContent>
      </Card>
      {open && (
        <Layer onEsc={toggleOpen} onClickOutside={toggleOpen}>
          <NewWorkoutBox
            toggleOpen={toggleOpen}
            date={date}
            workout={workout}
          />
        </Layer>
      )}
    </>
  );
};

export default WorkoutCard;
