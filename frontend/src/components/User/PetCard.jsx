import { Box, Button, ImageListItem, Typography } from '@mui/material';

export default function PetCard({ pet }) {
  return (
    <Box>
      <Typography>{pet.petName}</Typography>
      <Typography>{pet.petDescription}</Typography>
      <ImageListItem>
        <img src={pet.imgURL} />
      </ImageListItem>
      <Button>Delete</Button>
    </Box>
  );
}
