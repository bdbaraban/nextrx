import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from 'grommet';

const StyledButton = styled(Button)`
  :hover {
    transform: scale(1.1);
  }
  transition-duration: 0.3s;
  transition-property: transform;
`;

/**
 * Customized icon button that grows on hover
 */
const IconButton = (props: ButtonProps): React.ReactElement => {
  return <StyledButton {...props} />;
};

export default IconButton;
