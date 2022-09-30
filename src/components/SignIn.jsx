import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function SignIn() {
    const firestore = firebase.firestore();
    const auth = firebase.auth();
    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
        const { uid, displayName, email, photoURL } = auth.currentUser;

        firestore.collection('users').doc(uid).get().then((docSnapshot) => {
            if (!docSnapshot.exists) {
                firestore.collection('users').doc(uid).set({
                    displayName,
                    email,
                    photoURL,
                    subscribed: false
                })
            }
        });
    }

    return (
        <button onClick={signInWithGoogle} className="p-0 border-0 cursor-pointer">
            <img src="https://www.drupal.org/files/issues/2020-01-19/google_logo.png" alt="Sign in with Google" width="200" height="50" />
        </button>
    )
}