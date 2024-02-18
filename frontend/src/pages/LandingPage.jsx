import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { getTokenDetails } from '../utilities/helperFuncs.js';

function LandingPage() {
  const navigate = useNavigate();
  const tokenDetails = getTokenDetails();
  // console.log('Token Details: ', tokenDetails);

  useEffect(() => {
    if (tokenDetails && tokenDetails.name) {
      navigate('/home/jobs');
    }
  });

  return (
    <>
      <Outlet />
    </>
  );
}

export default LandingPage;
