import React from 'react';
import { Box, CheckBox, Select, TextArea, TextInput, Text } from 'grommet';
import { Movement } from '../db/types';

/**
 * WODForm component prop types
 */
interface WODFormProps {
  movement: Movement;
  index: number;
  handleUpdate: (update: Partial<Movement>, index: number) => void;
}

/**
 * Form component for adding/editing WOD's
 */
const WODForm = ({
  movement,
  index,
  handleUpdate
}: WODFormProps): React.ReactElement => {
  const {
    score_type,
    score,
    minutes,
    rounds,
    description,
    rx,
    lift,
    scheme,
    one_rep_max
  } = movement;

  // Constant 1-60 range for selects
  const RANGE = Array.from({ length: 60 }, (_, k): number => k + 1);

  return (
    <Box
      margin={{ top: 'medium', bottom: 'medium' }}
      style={{ minHeight: 'min-content' }}
    >
      <Box direction="row" margin={{ top: 'small' }}>
        <Select
          a11yTitle="score type"
          size="small"
          margin={{ right: 'xsmall', bottom: 'xsmall' }}
          options={['reps', 'time', 'load', 'other']}
          value={score_type === 'other' ? 'Other' : `For ${score_type}`}
          onChange={({ option }): void =>
            handleUpdate({ score_type: option }, index)
          }
        />
        {score_type === 'reps' ? (
          <Select
            a11yTitle="minutes"
            size="small"
            margin={{ left: 'xsmall', bottom: 'xsmall' }}
            options={RANGE}
            value={`${String(minutes)} ${minutes === 1 ? 'minute' : 'minutes'}`}
            onChange={({ option }): void =>
              handleUpdate({ minutes: option }, index)
            }
          />
        ) : score_type === 'load' ? (
          <React.Fragment>
            <Select
              a11yTitle="Load rounds"
              size="small"
              margin={{ left: 'xsmall', bottom: 'xsmall' }}
              options={RANGE}
              value={String(scheme.rounds)}
              onChange={({ option }): void =>
                handleUpdate(
                  { scheme: Object.assign({}, scheme, { rounds: option }) },
                  index
                )
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
              a11yTitle="Load reps"
              size="small"
              margin={{ bottom: 'xsmall' }}
              options={RANGE}
              value={String(scheme.reps)}
              onChange={({ option }): void =>
                handleUpdate(
                  { scheme: Object.assign({}, scheme, { reps: option }) },
                  index
                )
              }
            />
          </React.Fragment>
        ) : (
          <Select
            a11yTitle="rounds"
            size="small"
            margin={{ left: 'xsmall', bottom: 'xsmall' }}
            options={RANGE}
            value={`${String(rounds)} ${rounds === 1 ? 'round' : 'rounds'}`}
            onChange={({ option }): void =>
              handleUpdate({ rounds: option }, index)
            }
          />
        )}
      </Box>
      {score_type !== 'load' ? (
        <TextArea
          placeholder="10 Box Jumps"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
            handleUpdate({ description: event.target.value }, index)
          }
          size="xsmall"
          resize={false}
          style={{ minHeight: 175 }}
        />
      ) : (
        <Select
          a11yTitle="lift"
          size="small"
          options={['Power Clean', 'Front Squat', 'Back Squat', 'Clean & Jerk']}
          value={lift}
          onChange={({ option }): void => handleUpdate({ lift: option }, index)}
        />
      )}
      <Box direction="row" fill="horizontal" margin={{ top: 'xsmall' }}>
        <Box width="77%" margin={{ right: 'xsmall' }}>
          <TextInput
            placeholder="Score"
            size="small"
            value={score}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              handleUpdate({ score: event.target.value }, index)
            }
          />
        </Box>
        <Box
          width="33%"
          align="center"
          justify="center"
          margin={{ left: 'small' }}
        >
          <CheckBox
            checked={rx || one_rep_max}
            label={score_type === 'load' ? '1RM?' : 'RX?'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              if (score_type === 'load') {
                handleUpdate({ one_rep_max: event.target.checked }, index);
              } else {
                handleUpdate({ rx: event.target.checked }, index);
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WODForm;
