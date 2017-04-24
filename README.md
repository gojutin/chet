#Chet

###A chatbot app built with React & Redux

##[Try the demo](http://chet.surge.sh)

###This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

####Main libraries used in this project:

 Library | What it does
------------ | -------------
[React](https://facebook.github.io/react/) | Manages the view layer and responsible for all DOM manipulation
[Redux](http://redux.js.org/) | Manages all domain and form state (Firebase and React component state)
[Reactstrap](https://reactstrap.github.io/)  | Provides styles Bootstrap 4 components

[Firebase](https://firebase.google.com/) | Realtime NoSQL database used to store the persistant data.

<h2 name="getting-started">Download the source code</h2>

###**Step 1**

`git clone https://github.com/gojutin/chet `

###**Step 2**

Create a new Firebase database at [https://firebase.google.com/](https://firebase.google.com/).

In the Firebase Console, change the Firebase rules to `true` for the **".read"** and **".write"** properties in the **Rules** tab of your database. ***This is not recommended in a production application***

Add your Firebase config object to `src/db.js`.

###**Step 3**

`cd chet `

`npm install`

`npm start`

Open `localhost:3000` in your browser.

