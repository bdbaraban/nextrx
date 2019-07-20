import React from 'react';
import { Box, Button, Form, FormField } from 'grommet';

/**
 * Index page login form.
 */
const LoginForm = (): React.ReactElement => {
  // Track invalid email
  const [emailError, setEmailError] = React.useState<boolean>(false);

  // Track invalid password
  const [passwordError, setPasswordError] = React.useState<boolean>(false);

  // Attempt to login with entered credentials
  const handleSubmit = async (event: any): Promise<void> => {
    setEmailError(false);
    setPasswordError(false);
    await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event.value)
    })
      .then((res: Response): any => res.json())
      .then((data): void => {
        if (!data.success) {
          if (data.message === 'Athlete not found.') {
            setEmailError(true);
          } else {
            setPasswordError(true);
          }
        } else {
          window.location = data.redirectURI;
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        htmlFor="email"
        label="Email"
        name="email"
        required={true}
        error={emailError && 'Athlete not found.'}
      />
      <FormField
        htmlFor="password"
        type="password"
        label="Password"
        name="password"
        required={true}
        error={passwordError && 'Incorrect password.'}
      />
      <Box pad="small">
        <Button label="Login" type="submit" />
      </Box>
    </Form>
  );
};

export default LoginForm;
