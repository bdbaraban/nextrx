import React from 'react';
import { Box, Layer, Text } from 'grommet';
import { Add, Edit, Trash } from 'grommet-icons';
import { Emoji, IconButton, WODDialog } from '.';
import { Athlete, Movement, Workout } from '../db/types';

/**
 * WODCard component prop types
 */
interface WODCardProps {
  // Logged in athlete
  athlete: Athlete;
  // Current selected WOD calendar date
  date: Date;
}

/**
 * Card component for displaying, adding and editing workouts
 */
const WODCard = ({ athlete, date }: WODCardProps): React.ReactElement => {
  // Add/edit WOD dialog open/closed boolean
  const [open, setOpen] = React.useState<boolean>(false);

  // Current selected WOD
  const [workout, setWorkout] = React.useState<Workout | undefined>(undefined);

  // Update current WOD on each date change
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

  // Open & close add/edit WOD dialog
  const toggleOpen = (): void => {
    setOpen(!open);
  };

  // Text to display for dates without WOD's
  const NO_WOD_TEXT = (
    <Text weight="bold">
      Rest day. <Emoji label="sleeping-face" symbol="😴" />
      <Emoji label="avocado" symbol="🥑" />
      <Emoji label="glass-of-milk" symbol="🥛" />
    </Text>
  );

  return (
    <>
      <Box
        basis="medium"
        border={{ side: 'all', size: 'medium', color: 'brand' }}
        round={true}
        width="100%"
      >
        <Box
          direction="row"
          justify="between"
          align="center"
          border="bottom"
          pad="small"
          style={{ minHeight: 'min-content' }}
        >
          <Text weight="bold">
            {date.getMonth()}/{date.getDate()}/{date.getFullYear()}
          </Text>
          <Box direction="row">
            <IconButton
              a11yTitle={workout ? 'Edit workout' : 'Add workout'}
              animation="hover"
              icon={
                workout ? (
                  <Edit color="accent-1" size="medium" />
                ) : (
                  <Add color="accent-1" size="medium" />
                )
              }
              onClick={toggleOpen}
            />
            {workout && (
              <IconButton
                a11yTitle="Delete"
                animation="hover"
                icon={<Trash color="accent-1" size="medium" />}
              />
            )}
          </Box>
        </Box>
        <Box pad="small" overflow="auto" style={{ scrollbarWidth: 'none' }}>
          {workout
            ? workout.movements.map(
                (movement: Movement, index: number): React.ReactFragment => {
                  const { score_type } = movement;

                  return (
                    <React.Fragment key={index}>
                      {score_type === 'other' ? (
                        <Text weight="bold">Not for time:</Text>
                      ) : (
                        <Text weight="bold">For {score_type}:</Text>
                      )}
                      <ul>
                        {score_type !== 'other' && (
                          <li>
                            <Text>
                              {score_type === 'reps'
                                ? movement['minutes']
                                : score_type === 'time'
                                ? movement['rounds']
                                : movement['lift']}{' '}
                              {score_type === 'load'
                                ? ''
                                : score_type === 'reps'
                                ? movement['minutes'] === 1
                                  ? 'minute'
                                  : 'minutes'
                                : movement['rounds'] === 1
                                ? 'round'
                                : 'rounds'}
                            </Text>
                          </li>
                        )}
                        {movement['description'] && (
                          <li>
                            <Text>{movement['description']}</Text>
                          </li>
                        )}
                        {movement['score'] && (
                          <li>
                            <Text>
                              {score_type === 'load' ? 'Weight: ' : 'Score: '}
                              {String(movement['score'])}
                            </Text>
                          </li>
                        )}
                        {movement['one_rep_max'] ||
                          (movement['rx'] && (
                            <li>
                              <Text>
                                {movement['one_rep_max'] ? '1RM ' : 'RX '}
                                <Emoji label="heavy-check-mark" symbol="✔" />
                              </Text>
                            </li>
                          ))}
                      </ul>
                    </React.Fragment>
                  );
                }
              )
            : NO_WOD_TEXT}
        </Box>
        <style jsx>{`
          ul {
            margin-top: 0.5em;
          }
        `}</style>
      </Box>
      {open && (
        <Layer onEsc={toggleOpen} onClickOutside={toggleOpen}>
          <WODDialog toggleOpen={toggleOpen} date={date} workout={workout} />
        </Layer>
      )}
    </>
  );
};

export default WODCard;
