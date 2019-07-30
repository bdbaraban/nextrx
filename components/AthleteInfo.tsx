import React from 'react';
import { Box, Text } from 'grommet';
import { Athlete, Workout } from '../db/types';
import { Emoji } from '.';

// Months codex
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

/**
 * Calculate the previous Monday of a given date.
 * @param date - Date to calculate previous Monday of.
 */
const getMonday = (date: Date): Date => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

/**
 * Count number of workouts posted within current week.
 * @param workouts - Array of total athlete workouts.
 */
const countActiveDays = (workouts: Workout[]): number => {
  let count = 0;
  const monday = getMonday(new Date());

  for (
    let i = workouts.length - 1, current = new Date(workouts[i].date);
    current > monday || current.getDate() === monday.getDate();
    current = new Date(workouts[--i].date)
  ) {
    count++;
  }

  return count;
};

interface AthleteInfoProps {
  athlete: Athlete;
}

/**
 * Athlete profile information
 */
const AthleteInfo = ({ athlete }: AthleteInfoProps): React.ReactElement => {
  const createdAt = new Date(athlete.created_at);
  const activeDays = countActiveDays(athlete.workouts);

  return (
    <Box direction="row" justify="between">
      <Box direction="column" justify="center" gap="xsmall">
        <Text size="medium">
          <Emoji label="tear-off-calendar" symbol="📆" /> Member since:{' '}
        </Text>
        <Text size="medium">
          <Emoji label="person-running" symbol="🏃" /> Active days this week:{' '}
        </Text>
        <Text size="medium">
          <Emoji label="flex-biceps" symbol="💪" /> Total logged WOD&apos;s:{' '}
        </Text>
      </Box>
      <Box direction="column" align="end" justify="center" gap="xsmall">
        <Text size="medium">
          {`${MONTHS[createdAt.getMonth() - 1]} ${createdAt.getFullYear()}`}
        </Text>
        <Text size="medium">{activeDays}</Text>
        <Text size="medium">{athlete.workouts.length}</Text>
      </Box>
    </Box>
  );
};

export default AthleteInfo;
