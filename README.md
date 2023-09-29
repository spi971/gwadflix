# gwadflix is a Clone built using React, Redux Toolkit, Firebase, Styled Components, Axios, Node.js, Express and MongoDB.

## Mongodb 
You should have mongodb on your computer or use [mongodb atlas](https://www.mongodb.com/atlas/database).

You have to put your url to the mongoose connect function in ``` /back/server.js```

your mongoo connection should look like this:
```
mongoose
  .connect("<your url to your mongo database>", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected db`);
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  }); 
```

## Firebase 
You should have an firebase account.


Then you have to create a firebase config file.
```touch /ui/src/config/firebase.js ```


The content of the file should lok like this
```
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: ""<your firebase informations>"",
  authDomain: "<your firebase informations>",
  projectId: "<your firebase informations>",
  storageBucket: "<your firebase informations>",
  messagingSenderId: "<your firebase informations>",
  appId: "<your firebase informations>",
  measurementId: "<your firebase informations>",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
```

## Steps to Start the App
+ Install React Dependencies ```cd ui && npm i ```
+ Instal Node Dependencies ```cd back && npm i ```
+ Start Node App with ```cd back && npm start ```
+ Start React App ```cd ui && npm start ```
