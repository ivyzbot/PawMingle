import { useNavigate } from 'react-router';
import { Button } from '@mui/material';

export default function PosterButtons({ jobID }) {
  const navigate = useNavigate();
  return (
    <Button
      color="primary"
      variant="outlined"
      size="small"
      onClick={() => navigate(`details/${jobID}`, { replace: true })}
    >
      View
    </Button>
  );
}
