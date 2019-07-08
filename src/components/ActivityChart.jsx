import React from 'react';
import { Chart, Tab, Tabs } from 'grommet';

const ActivityChart = () => {
  return (
    <Tabs>
      <Tab title="This Week">
        <Chart
          type="bar"
          round
          bounds={[[1, 7], [0, 7]]}
          values={[
            { value: [7, 3], label: 'Monday' },
            { value: [6, 1], label: 'Tuesday' },
            { value: [5, 6], label: 'Wednesday' },
            { value: [4, 2], label: 'Thursday' },
            { value: [3, 2], label: 'Friday' },
            { value: [2, 1], label: 'Saturday' },
            { value: [1, 6], label: 'Sunday' }
          ]}
          aria-label="chart"
        />
      </Tab>
      <Tab title="Last 6 Months">
        <Chart
          type="bar"
          round
          bounds={[[1, 7], [0, 7]]}
          values={[
            { value: [7, 7], label: 'Monday' },
            { value: [6, 4], label: 'Tuesday' },
            { value: [5, 6], label: 'Wednesday' },
            { value: [4, 3], label: 'Thursday' },
            { value: [3, 2], label: 'Friday' },
            { value: [2, 1], label: 'Saturday' },
            { value: [1, 5], label: 'Sunday' }
          ]}
          aria-label="chart"
        />
      </Tab>
      <Tab title="Last 12 Months">
        <Chart
          type="bar"
          round
          bounds={[[1, 7], [0, 7]]}
          values={[
            { value: [7, 0], label: 'Monday' },
            { value: [6, 1], label: 'Tuesday' },
            { value: [5, 6], label: 'Wednesday' },
            { value: [4, 3], label: 'Thursday' },
            { value: [3, 7], label: 'Friday' },
            { value: [2, 1], label: 'Saturday' },
            { value: [1, 3], label: 'Sunday' }
          ]}
          aria-label="chart"
        />
      </Tab>
    </Tabs>
  );
};

export default ActivityChart;
