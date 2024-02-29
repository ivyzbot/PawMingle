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

function convertBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function uploadImage(evt) {
  const file = evt.target.files[0];
  const base64 = await convertBase64(file);
  return base64;
}

export async function fetchPetToken(queryFn) {
  const petTokenData = await queryFn();
  const currentTime = new Date();
  const expiryTime = currentTime.setSeconds(
    currentTime.getSeconds() + petTokenData.expires_in
  );
  localStorage.setItem('petToken', petTokenData.access_token);
  localStorage.setItem('petTokenExpiry', expiryTime);
}
