import { useContext } from 'react';
import { UserContext } from '../../pages/Homepage';

export default function Jobs() {
  const states = useContext(UserContext);
  // console.log('UserContext:', states);
  return <div>Jobs</div>;
}
