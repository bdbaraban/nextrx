import React from 'react';
import { Box, Button, Form, FormField } from 'grommet';

/**
 * Index page sign up form.
 */
const SignUpForm = (): React.ReactElement => {
  // Attempt to sign up with entered credentials
  const handleSubmit = async (event: any): Promise<void> => {
    await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event.value)
    })
      .then((res: Response): any => res.json())
      .then((data): void => {
        if (data.redirectURI) {
          window.location = data.redirectURI;
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField label="Email*" name="email" required={true} />
      <FormField label="Password*" name="password" required={true} />
      <FormField label="Affiliate" name="affiliate" />
      <Box pad="small">
        <Button label="Register" type="submit" />
      </Box>
    </Form>
  );
};

export default SignUpForm;
