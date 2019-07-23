import React from 'react';
import { Box, Button, Form, FormField, Text } from 'grommet';

interface ErrorState {
  status: boolean;
  message: string;
}

const initialErrorState = {
  status: false,
  message: ''
};

/**
 * Index page sign up form.
 */
const SignUpForm = (): React.ReactElement => {
  const [error, setError] = React.useState<ErrorState>(initialErrorState);

  // Attempt to sign up with entered credentials
  const handleSubmit = async (event: any): Promise<void> => {
    const { email, password } = event.value;
    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      return setError({
        status: true,
        message: 'Min. 8 chars, 1 letter, 1 number.'
      });
    }
    setError(initialErrorState);
    await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then((res: Response): any => res.json())
      .then((data): void => {
        if (!data.success) {
          setError({
            status: true,
            message: data.message
          });
        } else {
          window.location = data.redirectURI;
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField htmlFor="email" label="Email*" name="email" required={true} />
      <FormField
        htmlFor="password"
        type="password"
        label="Password*"
        name="password"
        required={true}
        error={error.status && error.message}
      />
      <Box pad="small">
        <Button label="Register" type="submit" />
      </Box>
      <Box pad="small" justify="center" align="center">
        <Text size="small" textAlign="center">
          By clicking Register, you agree to
          <br />
          share your email with NextRX.
        </Text>
      </Box>
    </Form>
  );
};

export default SignUpForm;
