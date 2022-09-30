import React from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import ChatRoom from './components/ChatRoom';
import firebaseConfig from './firebase';
import { Header } from './components/common';
import Challenge from './components/challenge';

function App() {
  firebase.initializeApp(firebaseConfig);
  return (
    <div className="App">
      {/* <div className="relative overflow-hidden bg-no-repeat bg-cover w-screen h-screen" style={{
        backgroundPosition: '50%',
        backgroundImage: "url('https://media4.giphy.com/media/bXhiABcqQGT3W/giphy-downsized-large.gif')",
        // backgroundImage: "url('https://i.pinimg.com/originals/0b/3d/0c/0b3d0c7d4cba82343643a5f4c48e2fba.gif')"
        // height: '350px'
      }}> */}
        <Header />
        <Challenge />
        <ChatRoom />
      </div>
    // </div>
  );
}

export default App;
