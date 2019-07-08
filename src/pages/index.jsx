import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Calendar, Grommet, Heading, ResponsiveContext } from 'grommet';
import ActivityChart from '../components/ActivityChart';
import AppBar from '../components/AppBar';
import AthleteInfo from '../components/AthleteInfo';
import Divider from '../components/Divider';
import RecordsTable from '../components/RecordsTable';
import Footer from '../components/Footer';
import WODStack from '../components/WODStack';

const Index = ({ theme }) => {
  const [date, setDate] = React.useState(new Date());

  const handleSelect = newDate => {
    setDate(new Date(newDate));
  };

  return (
    <Grommet theme={theme.object} full>
      <AppBar />
      <ResponsiveContext.Consumer>
        {size => (
          <Box flex direction="column" align="center" justify="center">
            <Box
              flex
              direction={size === 'small' ? 'column' : 'row'}
              align="center"
              alignSelf="center"
              justify="center"
              width="85%"
              style={{ minHeight: 'min-content' }}
            >
              <Box
                direction="row"
                justify="center"
                width={size === 'small' ? '100%' : '45%'}
              >
                <AthleteInfo size={size} />
              </Box>
              <Box
                direction="column"
                align="center"
                width={size === 'small' ? '100%' : '45%'}
              >
                <Heading level="4" textAlign="center">
                  Active days this week: 4
                </Heading>
                <ActivityChart />
              </Box>
            </Box>
            <Divider text="WOD's" />
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
            <Divider text="Records" />
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
    </Grommet>
  );
};

Index.propTypes = {
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { theme: state.theme };
};

export default connect(mapStateToProps)(Index);
