import { useQuery, useMutation } from '@tanstack/react-query';
import qs from 'qs';
import { petFinderTokenClient, petFinderClient } from '../apiClient/petfinder';

function useGetFinderTokenMutation() {
  const body = {
    grant_type: 'client_credentials',
    client_id: 'TUeWgm4FAxi8PkCMnrN4QQYA3U393VTJQodGsHISsYsRxnnbj7',
    client_secret: 'a2NnNg0Jtc5gS1AnFKx37KeQ0AnmIqFCqwaCGXmQ',
  };

  //   console.log('body stringify:', qs.stringify(body));
  return useMutation({
    mutationFn: async () => {
      return (await petFinderTokenClient.post('/', qs.stringify(body))).data;
    },
  });
}

// function useGetPetFinderMutation(getTokenFn) {
//   return useQuery({
//     queryKey: ['petFinder'],
//     queryFn: async () => {
//       if (
//         localStorage.getItem('petToken') &&
//         localStorage.getItem('petTokenExpiry') > new Date()
//       ) {
//         return (await petFinderClient.get('/')).data;
//       } else {
//         await getTokenFn();
//         return (await petFinderClient.get('/')).data;
//       }
//     },
//     fetchPolicy: 'network-only',
//   });
// }

async function fetchPetFinder(getTokenFn) {
  if (
    !localStorage.getItem('petToken') ||
    localStorage.getItem('petTokenExpiry') <= new Date()
  ) {
    await getTokenFn();
  }
  const token = localStorage.getItem('petToken');
  const rawData = (await petFinderClient(token).get('/')).data.animals;
  const petData = [];
  if (rawData && rawData.length !== 0) {
    rawData.map((animal) =>
      petData.push({
        description: animal.description,
        name: animal.name,
        id: animal.id,
        imgURL: animal.primary_photo_cropped,
        species: animal.species,
        url: animal.url,
      })
    );
  }

  console.log('petFinderData', petData);
  return petData;
}

export { useGetFinderTokenMutation, fetchPetFinder };
