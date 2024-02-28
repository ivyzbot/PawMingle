import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  ImageListItem,
  Typography,
} from '@mui/material';

export default function PetCard({ pet }) {
  return (
    // <Box>
    //   <Typography>{pet.petName}</Typography>
    //   <Typography>{pet.petDescription}</Typography>
    //   <ImageListItem>
    //     <img src={pet.imgURL} />
    //   </ImageListItem>
    //   <Button>Delete</Button>
    // </Box>

    <Card
      sx={{
        maxWidth: 345,
        my: 2,
        border: '1px solid',
        borderColor: 'grey.main',
        borderRadius: 5,
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={pet.imgURL}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pet.petName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pet.petDescription}
        </Typography>
      </CardContent>
      <CardActions sx={{ backgroundColor: 'light.secondary' }}>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
