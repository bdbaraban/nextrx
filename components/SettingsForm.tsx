import React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Box, Button, Form, FormField } from 'grommet';
import { AppState } from '../store';
import { updateAthlete } from '../store/athlete/actions';
import { AthleteState } from '../store/athlete/types';
import { Athlete } from '../db/types';
import { Popper } from './';

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
 * Settings page form for changing account settings.
 */
const SettingsForm = ({
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
      <Box direction="row" gap="small">
        <Box basis="1/2">
          <FormField
            label="First Name"
            name="first_name"
            value={athlete.first_name}
          />
        </Box>
        <Box basis="1/2">
          <FormField
            label="Last Name"
            name="last_name"
            value={athlete.last_name}
          />
        </Box>
      </Box>
      <FormField label="Email" name="email" value={athlete.email} />
      <FormField label="Affiliate" name="affiliate" value={athlete.affiliate} />
      <FormField
        label="Profile Image URL"
        name="profile_image_url"
        value={athlete.profile_image_url}
      />
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
)(SettingsForm);
