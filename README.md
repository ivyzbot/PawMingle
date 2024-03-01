# PawMingle
A community for pet-lovers to find pet-related side hustles or to offer their pet-related expertise.


#### Live at: 
https://pawmingle-frontend.onrender.com

## Tech Stack - MERN

**Client:** 
+ React
    + React Router
    + React Query (asynchronous state management)
    + React Helmet (head manager)
+ Material UI
+ Other Libraries
    + axios (HTTP client)
    + crypto-JS (encryption)
    + [boring-avatars (random avatar generator)](https://boringavatars.com/)
    + moment (date formating)
    + he (HTML entities encoding/decoding)
    + qs (querystring parsing and stringifying)

**Server:** 
+ Node
+ Express
+ MongoDB (with Mongoose)
+ Other Libraries
    + jsonwebtoken

## Designs:
+ [Wireframe](https://drive.google.com/drive/folders/1a622myBvC5iAEqe--LcPogK7iSXzdEU4?usp=sharing)
+ ERD:
![image](https://github.com/ivyzbot/PawMingle/assets/10040970/efaf9b82-f739-4577-8ef1-21f5f87e7d37)




## User Journey
## Landing Page: Signup & Signin
<img width="1412" alt="image" src="https://github.com/ivyzbot/PawMingle/assets/10040970/f735be58-6038-4f21-ade4-c1e7cd5be6c4">
<img width="1402" alt="image" src="https://github.com/ivyzbot/PawMingle/assets/10040970/890a478e-e008-42d8-9735-69da78f671c5">

## Home Page
#### Left: User Info Section. Summary of user-related stats.
![image](https://github.com/ivyzbot/PawMingle/assets/10040970/5825aec5-7170-4cbd-ae8b-4310d6926fe0)
#### Center: Job Section. Include all jobs posted on PawMingle. Showing different buttons with corresponding actions based on user type (poster or not)
![image](https://github.com/ivyzbot/PawMingle/assets/10040970/537e4f4b-25fd-478e-894e-7989bbe9d846)
![image](https://github.com/ivyzbot/PawMingle/assets/10040970/bf3dc8d8-183f-408a-bffe-87dbcf34dce5)

#### Right: realtime pet-adoption info retrieved from 3rd party API


#### As a job poster, you can selecte from the candidates, and give reviews once jobs are done.
![image](https://github.com/ivyzbot/PawMingle/assets/10040970/826a2533-6188-45ee-a9c4-9fdc8e3c7950)
![image](https://github.com/ivyzbot/PawMingle/assets/10040970/427f2352-5736-4301-b677-4c3ea53899c0)



## Add pets to your profile:
![image](https://github.com/ivyzbot/PawMingle/assets/10040970/dfa2c2a0-2a02-41c6-8cc6-60fa9cc0e70b)

## Me Page
#### Jobs posted & taken
![image](https://github.com/ivyzbot/PawMingle/assets/10040970/6fa9bcc3-ff6b-4777-8cda-c3861b0bf3ed)

#### Reviews given & received
![image](https://github.com/ivyzbot/PawMingle/assets/10040970/297df847-9186-4f82-b56f-95f6d1c23d92)


#### Favorite componnet:
+ File upload function
```javascript
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
```
+ 3rd Party API

## Key Chanllenges:
Conditional rendering of action buttons and button status for Job Card

## Next Steps:
#### In-app messaging
#### Feeds function

