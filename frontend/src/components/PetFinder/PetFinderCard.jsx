import { Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

export default function PetFinderCard({ pet }) {
  return (
    <Grid item xs={12}>
      <Card
        sx={{
          border: '1px solid',
          borderColor: 'grey.main',
          borderRadius: 5,
          maxHeight: 700,
        }}
        elevation={0}
      >
        {pet.imgURL && pet.imgURL.small ? (
          <CardMedia
            component="img"
            image={pet.imgURL.small}
            alt="No Pet Picture"
            sx={{ maxHeight: 300 }}
          />
        ) : null}
        <Typography variant="h6" m={2}>
          {pet.name ? pet.name : 'infanta'} the{' '}
          {pet.species ? pet.species : 'pet'}
        </Typography>
        <Typography variant="subtitle1" mx={2}>
          {pet.description ? pet.description : null}
        </Typography>
        <Link to={pet.url ? pet.url : null} target="_blank" my={1}>
          <Button variant="text" endIcon={<QuestionAnswerIcon />}>
            Know More About Me
          </Button>
        </Link>
      </Card>
    </Grid>
  );
}
