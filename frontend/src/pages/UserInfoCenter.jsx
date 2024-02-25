import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import UserNavBar from '../components/User/UserNavBar';
import { getTokenDetails } from '../utilities/helperFuncs.js';

export default function UserInfoCenter() {
  const tokenDetails = getTokenDetails();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenDetails || !tokenDetails.name) {
      navigate('/');
    }
  });

  return (
    <>
      <UserNavBar />
      <Outlet />
    </>
  );
}
