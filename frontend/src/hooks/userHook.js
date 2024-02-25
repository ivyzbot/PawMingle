// import { useQuery } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient/apiClient';
import { removeToken } from '../utilities/security';

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

function useSignoutMutation() {
  return useMutation({
    mutationFn: async (body) => {
      (await apiClient.patch('users/signout', body)).data;
      removeToken();
    },
  });
}

function useAddPetMutation() {
  return useMutation({
    mutationFn: async (body) => {
      // const userID = body.userID;
      // const bodyToUpdate = {
      //   petName: body.petName,
      //   petDescription: body.petDescription,
      //   imgURL: body.imgURL,
      // };
      return (await apiClient.patch(`users/addpet`, body)).data;
    },
  });
}

function useGetUserPetQuery(userID) {
  return useQuery({
    queryKey: ['userPet', userID],
    queryFn: async () => (await apiClient.get(`users/getpet/${userID}`)).data,
  });
}

export {
  useSignupMutation,
  useGetUserDetailsMutation,
  useSigninMutation,
  useSignoutMutation,
  useAddPetMutation,
  useGetUserPetQuery,
};
