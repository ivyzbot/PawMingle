import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Tab, Tabs } from '@mui/material/';

export default function UserNavBar() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (evt, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Jobs" onClick={() => navigate('jobs')} />
        <Tab label="Reviews" onClick={() => navigate('reviews')} />
      </Tabs>
    </Box>
  );
}
