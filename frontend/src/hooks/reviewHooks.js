import { useMutation } from '@tanstack/react-query';
import apiClient from '../apiClient/apiClient';

function useCreateReviewMutation() {
  return useMutation({
    mutationFn: async (body) =>
      (await apiClient.post('reviews/create', body)).data,
  });
}

export { useCreateReviewMutation };
