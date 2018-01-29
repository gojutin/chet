import * as firebase from "firebase";
// import faker from 'faker';
    
const config = {
  // enter your Firebase config options here
  
  apiKey: "AIzaSyAzT9yIvJFEQnNx7gmHFC1d8J1YAO6hato",
  authDomain: "chatbot-4b0c0.firebaseapp.com",
  databaseURL: "https://chatbot-4b0c0.firebaseio.com",
  projectId: "chatbot-4b0c0",
  storageBucket: "chatbot-4b0c0.appspot.com",
  messagingSenderId: "324301884288"

  // TEST DB
  // apiKey: "AIzaSyAfvkFKnQr6JgN2gAQ9JFgg_V2vtyJAy0U",
  // authDomain: "chet2-6478a.firebaseapp.com",
  // databaseURL: "https://chet2-6478a.firebaseio.com",
  // projectId: "chet2-6478a",
  // storageBucket: "chet2-6478a.appspot.com",
  // messagingSenderId: "1026325912995"
};

firebase.initializeApp(config);

// const fakeData = () => {
//   let arr = [];
//   for (let i = 0; i < 1000; i++) {
//     arr.push({
//       id: Math.floor(Math.random() * 99999999999999999999),
//       term: faker.lorem.sentence()
//     })
//   }
//   return arr;
// }
