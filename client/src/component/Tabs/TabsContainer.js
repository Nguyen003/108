import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel from './CustomTabPanel';

const TabsContainer = ({ tabs, panels }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {panels.map((panel, index) => (
        <CustomTabPanel value={value} index={index} key={index} sx={{ height: '90%' }}>
          {panel}
        </CustomTabPanel>
      ))}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="dynamic tabs example">
          {tabs.map((tab, index) => (
            <Tab label={tab} key={index} id={`tab-${index}`} aria-controls={`tabpanel-${index}`} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default TabsContainer;
