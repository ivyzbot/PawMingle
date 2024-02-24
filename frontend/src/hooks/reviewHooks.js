import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient/apiClient';

function useCreateReviewMutation() {
  return useMutation({
    mutationFn: async (body) =>
      (await apiClient.post('reviews/create', body)).data,
  });
}

function useGetReviewCountQuery(userID) {
  return useQuery({
    queryKey: ['reviewCount', userID],
    queryFn: async () =>
      (await apiClient.get(`reviews/getcount/${userID}`)).data,
  });
}

export { useCreateReviewMutation, useGetReviewCountQuery };
