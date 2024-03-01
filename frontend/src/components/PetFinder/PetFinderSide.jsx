import { useEffect, useState } from 'react';
import {
  useGetFinderTokenMutation,
  fetchPetFinder,
} from '../../hooks/petFinderHooks';
import { fetchPetToken } from '../../utilities/helperFuncs';
import PetFinderCard from './PetFinderCard';
import { Box, Grid, Typography } from '@mui/material';
import he from 'he';

export default function PetFinderSide() {
  const { mutateAsync: getToken } = useGetFinderTokenMutation();
  const [petFinderData, setPetFinderData] = useState();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchPetFinder(() => fetchPetToken(getToken));
      console.log(data);
      setPetFinderData(data);
    }
    fetchData();
  }, []);

  //   async function fetchPetToken() {
  //     const body = {
  //       grant_type: 'client_credentials',
  //       client_id: 'TUeWgm4FAxi8PkCMnrN4QQYA3U393VTJQodGsHISsYsRxnnbj7',
  //       client_secret: 'a2NnNg0Jtc5gS1AnFKx37KeQ0AnmIqFCqwaCGXmQ',
  //     };
  //     const petToken = await axios.post(
  //       'https://api.petfinder.com/v2/oauth2/token',
  //       qs.stringify(body)
  //     );
  //     setPetToken(petToken);
  //   }

  return (
    <Box mt={6}>
      <Typography
        variant="h6"
        sx={{
          backgroundColor: 'primary.main',
          borderRadius: '20px',
        }}
      >
        Take Me Home
      </Typography>
      <Grid container rowSpacing={1} mt={6}>
        {!petFinderData ? (
          <Typography></Typography>
        ) : (
          petFinderData.map((pet) => <PetFinderCard pet={pet} key={pet.id} />)
        )}
      </Grid>
    </Box>
  );
}
