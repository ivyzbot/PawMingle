import axios from 'axios';

const petFinderClient = (token) =>
  axios.create({
    baseURL: 'https://api.petfinder.com/v2/animals',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token,
      //   'Access-Control-Allow-Origin': true,
    },
  });

const petFinderTokenClient = axios.create({
  baseURL: 'https://api.petfinder.com/v2/oauth2/token',
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
    // 'Access-Control-Allow-Origin': true,
  },
});

export { petFinderClient, petFinderTokenClient };
