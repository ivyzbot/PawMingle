// import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../apiClient/apiClient';

// const useSignupMutation = () =>
//   useMutation({
//     mutationFn: async (body) =>
//       (await apiClient.post('users/signup', body)).data,
//   });

function useSignupMutation() {
  return useMutation({
    mutationFn: async (body) =>
      (await apiClient.post('users/signup', body)).data,
  });
}

function useGetUserDetailsMutation() {
  return useMutation({
    mutationFn: async (body) =>
      (await apiClient.get(`users/signin/${body.email}`)).data,
  });
}

function useSigninMutation() {
  return useMutation({
    mutationFn: async (body) =>
      (await apiClient.patch('users/signin', body)).data,
  });
}

export { useSignupMutation, useGetUserDetailsMutation, useSigninMutation };
