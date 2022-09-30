import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth'

import './Chaltext.css';

function Chaltext() {
  const auth = firebase.auth();
  const [user] = useAuthState(auth)

  return (
    <header>
        <div class="box">
          <div class="inner">
            <span>Today's Challenge is: Only shower for 2 minutes</span>
          </div>
          <div class="inner">
            <span>Today's Challenge is: Only shower for 2 minutes</span>
          </div>
        </div>
    </header >
  )
}

export default Chaltext; 