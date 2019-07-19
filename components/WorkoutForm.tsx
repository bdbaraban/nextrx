import React from 'react';
import { Box, CheckBox, Select, TextArea, Text } from 'grommet';

const WorkoutForm = (): React.ReactElement => {
  const [type, setType] = React.useState('For reps');
  const [minutes, setMinutes] = React.useState(12);
  const [rounds, setRounds] = React.useState(1);
  const [load, setLoad] = React.useState({
    rounds: 3,
    reps: 4
  });
  const [notes, setNotes] = React.useState('');
  const [lift, setLift] = React.useState('Power Clean');
  const [checked, setChecked] = React.useState(false);

  return (
    <Box
      margin={{ top: 'medium', bottom: 'medium' }}
      style={{ minHeight: 'min-content' }}
    >
      <Box direction="row" margin={{ top: 'small' }}>
        <Select
          size="small"
          margin={{ right: 'xmsmall', bottom: 'xsmall' }}
          options={['For reps', 'For time', 'For load', 'Other']}
          value={type}
          onChange={({ option }): void => setType(option)}
        />
        {type === 'For reps' ? (
          <Select
            a11yTitle="Time select"
            size="small"
            margin={{ left: 'xsmall', bottom: 'xsmall' }}
            options={Array.from({ length: 30 }, (_, k): string =>
              String(k + 1)
            )}
            value={`${String(minutes)} ${minutes === 1 ? 'minute' : 'minutes'}`}
            onChange={({ option }): void => setMinutes(option)}
          />
        ) : type === 'For time' ? (
          <Select
            a11yTitle="Rounds select"
            size="small"
            margin={{ left: 'xsmall', bottom: 'xsmall' }}
            options={Array.from({ length: 50 }, (_, k): string =>
              String(k + 1)
            )}
            value={`${String(rounds)} ${rounds === 1 ? 'round' : 'rounds'}`}
            onChange={({ option }): void => setRounds(option)}
          />
        ) : type === 'For load' ? (
          <React.Fragment>
            <Select
              a11yTitle="Load rounds select"
              size="small"
              margin={{ left: 'xsmall', bottom: 'xsmall' }}
              options={Array.from({ length: 50 }, (_, k): string =>
                String(k + 1)
              )}
              value={String(load.rounds)}
              onChange={({ option }): void =>
                setLoad(Object.assign({}, load, { rounds: option }))
              }
            />
            <Box
              align="center"
              justify="center"
              margin={{ left: 'small', right: 'small' }}
            >
              <Text alignSelf="center" weight="bold">
                X
              </Text>
            </Box>
            <Select
              a11yTitle="Load reps select"
              size="small"
              margin={{ left: 'xsmall', bottom: 'xsmall' }}
              options={Array.from({ length: 50 }, (_, k): string =>
                String(k + 1)
              )}
              value={String(load.reps)}
              onChange={({ option }): void =>
                setLoad(Object.assign({}, load, { rounds: option }))
              }
            />
          </React.Fragment>
        ) : (
          <Select
            a11yTitle="Rounds select"
            disabled
            size="small"
            margin={{ left: 'xsmall', bottom: 'xsmall' }}
            options={Array.from({ length: 50 }, (_, k): string =>
              String(k + 1)
            )}
            value={String(rounds)}
            onChange={({ option }): void => setRounds(option)}
          />
        )}
      </Box>
      {type !== 'For load' ? (
        <TextArea
          placeholder="10 Box Jumps"
          value={notes}
          onChange={(event): void => setNotes(event.target.value)}
          size="xsmall"
          resize={false}
          style={{ minHeight: 175 }}
        />
      ) : (
        <Box direction="row" fill="horizontal" justify="between">
          <Select
            a11yTitle="Rounds select"
            size="small"
            options={[
              'Power Clean',
              'Front Squat',
              'Back Squat',
              'Clean & Jerk'
            ]}
            value={lift}
            onChange={({ option }): void => setLift(option)}
          />
          <CheckBox
            checked={checked}
            label="1RM?"
            onChange={(event): void => setChecked(event.target.checked)}
          />
        </Box>
      )}
    </Box>
  );
};

export default WorkoutForm;
