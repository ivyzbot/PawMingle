import { getToken } from './security';

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getTokenDetails() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split('.')[1])).payload : null;
  // return token ? "test" : null;
}
