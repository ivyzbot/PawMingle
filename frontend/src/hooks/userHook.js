// import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../apiClient/apiClient';

const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (body) =>
      (await apiClient.post('users/signup', body)).data,
  });
};

// function useSignupMutation() {
//   return useMutation({
//     mutationFn: async (body) =>
//       (await apiClient.post('users/signup', body)).data,
//   });
// }

export { useSignupMutation };
