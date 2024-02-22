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
    queryFn: async () => (await apiClient.get('jobs/getall')).data,
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

// function useGetOneJobQuery(jobID) {
//   console.log('useGetOneJobQuery is called with jobID:', jobID);
//   return useQuery({
//     queryKey: ['test', jobID],
//     queryFn: async () => {
//       console.log(`jobs/getone/${jobID}`);
//       return (await apiClient.get(`jobs/getone/${jobID}`)).data;
//     },
//   });
// }

async function useGetOneJobQuery(jobID) {
  return (await apiClient.get(`jobs/getone/${jobID}`)).data;
}

export {
  useCreateJobMutation,
  useGetJobsQuery,
  useUpdateJobMutation,
  useGetOneJobQuery,
};
