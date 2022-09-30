import React from 'react';
import SignIn from '../../SignIn';
import SignOut from '../../SignOut';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth'

import './Header.css';

function Header() {
  const auth = firebase.auth();
  const [user] = useAuthState(auth)

  return (
    <header>
      {/* <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}> */}
      {/* <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"> */}
      <div className="flex justify-center items-center h-full w-screen bg-gray-800 bg-opacity-90">
        <div className="text-center text-white p-6 md:px-12 w-full">
          <h1 className="text-5xl font-bold mt-0 mb-6">BeGreen</h1>
          <section className='absolute top-10 right-10'>{user ? <SignOut /> : <SignIn />}</section>
          <h3 className="text-3xl font-bold mb-8">Make the Earth a Greener Place</h3>
          <button type="button"
            className="inline-block px-6 py-2.5 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            data-mdb-ripple="true" data-mdb-ripple-color="light">
            Subscribe to receive daily Green Challenges
          </button>
        </div>
      </div>
      {/* </div> */}
    </header >
  )
}

export default Header; 