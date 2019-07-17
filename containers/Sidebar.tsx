import React from 'react';
import { Box, Button } from 'grommet';
import { Close, Menu } from 'grommet-icons';
import { SidebarMenu } from 'components';

const Sidebar = (): React.ReactElement => {
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleOpen = (): void => {
    setOpen(!open);
  };

  return (
    <Box direction="row">
      <Button
        icon={open ? <Close color="accent-1" /> : <Menu />}
        onClick={toggleOpen}
        style={open ? { zIndex: 9999 } : { zIndex: 1 }}
      />
      {open && <SidebarMenu toggleOpen={toggleOpen} />}
    </Box>
  );
};

export default Sidebar;
