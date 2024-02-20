import { useMutation } from '@tanstack/react-query';
import apiClient from '../apiClient/apiClient';

function useCreateJobMutation() {
  return useMutation({
    mutationFn: async (body) =>
      (await apiClient.post('jobs/create', body)).data,
  });
}

export { useCreateJobMutation };
