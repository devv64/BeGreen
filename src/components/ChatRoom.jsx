import React, { useState, useRef } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import 'firebase/compat/auth';
import ChatMessage from './ChatMessage';
import { useAuthState } from 'react-firebase-hooks/auth'

export default function ChatRoom() {
    const auth = firebase.auth();
    const firestore = firebase.firestore();
    const [user] = useAuthState(auth)
    const messagesRef = firestore.collection('posts');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('')
    const dummy = useRef()
    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className='flex justify-center items-center h-full w-screen'>
            <div className='w-3/4 bg-gray-800 bg-opacity-50 rounded'>
                <main>
                    <table className="table-auto m-5">
                        <tbody>
                            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                        </tbody>
                    </table>
                    <div ref={dummy}></div>
                </main>
                {user ? <form onSubmit={sendMessage}>
                    <input className='' value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                    <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' type="submit">Submit</button>
                </form> : <p>Please Sign in with google to chat</p>}

            </div>
        </div>
    )
}