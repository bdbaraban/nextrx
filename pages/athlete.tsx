import React from 'react';
import { Box, Calendar, ResponsiveContext } from 'grommet';
import AppBar from '../containers/AppBar';
import Divider from '../components/Divider';
import RecordsTable from '../components/RecordsTable';
import Footer from '../components/Footer';
import WODStack from '../components/WODStack';
import { NextPage } from 'next';
import { InfoSection } from 'containers';

const AthletePage: NextPage<{}> = (): React.ReactElement => {
  const [date, setDate] = React.useState(new Date());

  const handleSelect = newDate => {
    setDate(new Date(newDate));
  };

  return (
    <>
      <AppBar />
      <ResponsiveContext.Consumer>
        {(size: string): React.ReactElement => (
          <Box flex direction="column" align="center" justify="center">
            <InfoSection />
            <Divider text="WOD's" symbol="💪" label="muscle" />
            <Box
              flex
              direction={size === 'small' ? 'column' : 'row'}
              align="center"
              justify="center"
              width="85%"
              style={{ minHeight: 'min-content' }}
            >
              <Box width={size === 'small' ? '100%' : '50%'} justify="center">
                <Calendar
                  size="small"
                  alignSelf="center"
                  daysOfWeek
                  date={date.toISOString()}
                  onSelect={handleSelect}
                />
              </Box>
              <Box
                width={size === 'small' ? '100%' : '50%'}
                margin={size === 'small' ? { top: 'large' } : {}}
                align="center"
                justify="center"
              >
                <WODStack date={date} />
              </Box>
            </Box>
            <Divider text="Records" symbol="🎖" label="medal" />
            <Box
              flex
              direction="row"
              align="center"
              justify="center"
              width="85%"
              style={{ minHeight: 'min-content' }}
            >
              <RecordsTable />
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
      <Footer />
    </>
  );
};

export default AthletePage;
