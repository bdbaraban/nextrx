import React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Box, Button, Form, FormField } from 'grommet';
import { updateAthlete } from '../store/athlete/actions';
import { AthleteState } from '../store/athlete/types';
import { AppState } from '../store';
import { Athlete } from '../db/types';
import { Popper } from '.';

/**
 * Mapped Redux state
 */
interface SettingsFormStateProps {
  athlete: Athlete;
  error: string;
}

/**
 * Mapped Redux actions
 */
interface SettingsFormDispatchProps {
  handleSubmit: (attributes: Partial<Athlete>) => void;
}

/**
 * SettingsForm component prop types
 */
type SettingsFormProps = SettingsFormStateProps & SettingsFormDispatchProps;

/**
 * Popper state type
 */
interface PopperState {
  open: boolean;
  message: string;
}

/**
 * Settings page form for changing account password.
 */
const ChangePasswordForm = ({
  athlete,
  error,
  handleSubmit
}: SettingsFormProps): React.ReactElement => {
  const [popper, setPopper] = React.useState<PopperState>({
    open: false,
    message: ''
  });

  const flashPopper = (message: string): void => {
    setPopper({
      open: true,
      message
    });
    setTimeout((): void => {
      setPopper({
        open: false,
        message: ''
      });
    }, 3500);
  };

  const onSubmit = (event: any): void => {
    handleSubmit({ _id: athlete._id, ...event.value });
    flashPopper(error === '' ? 'Changes saved!' : error);
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormField label="Current Password" name="currentPassword" />
      <FormField label="New Password" name="newPassword" />
      <FormField label="Confirm New Password" name="confirmPassword" />
      <Box pad="small">
        <Button label="Save Changes" type="submit" />
        {popper.open && <Popper message={popper.message} />}
      </Box>
    </Form>
  );
};

const mapStateToProps = (state: AppState): SettingsFormStateProps => {
  return {
    athlete: state.athlete.profile,
    error: state.athlete.error
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AthleteState, null, Action<string>>
): SettingsFormDispatchProps => {
  return {
    handleSubmit: (attributes: Partial<Athlete>): void => {
      dispatch(updateAthlete(attributes));
    }
  };
};

export default connect<
  SettingsFormStateProps,
  SettingsFormDispatchProps,
  {},
  AppState
>(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordForm);
