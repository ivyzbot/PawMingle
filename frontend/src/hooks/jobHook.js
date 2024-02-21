import { useQuery, useMutation } from '@tanstack/react-query';
import apiClient from '../apiClient/apiClient';

function useCreateJobMutation() {
  return useMutation({
    mutationFn: async (body) =>
      (await apiClient.post('jobs/create', body)).data,
  });
}

function useGetJobsQuery() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => (await apiClient.get(`jobs/getall`)).data,
  });
}

function useUpdateJobMutation() {
  return useMutation({
    mutationFn: async (variable) => {
      const body = variable.body;
      const jobID = variable.jobID;
      return (await apiClient.patch(`jobs/update/${jobID}`, body)).data;
    },
  });
}

export { useCreateJobMutation, useGetJobsQuery, useUpdateJobMutation };
