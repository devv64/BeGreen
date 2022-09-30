import 'firebase/compat/auth';
import React, { useEffect, useState } from 'react'
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

export default function ChatMessage(props) {
    const [user, setUser] = useState('');
    const { text, uid } = props.message

    useEffect(() => {
        const firestore = firebase.firestore();
        (async () => {
            const userRef = await firestore.collection('users').doc(uid).get();
            setUser(userRef.data());
        })()
    }, [uid])

    return (
        <tr className='m-5 shadow-2xl'>
            <td><img className='w-auto h-auto rounded-full h-12 w-12' src={user.photoURL} alt='Google Profile' /></td>
            <td className='flex flex-col'>
                <p className='pl-5 text-xl text-white font-extrabold'>{user.displayName}</p>
                <p className='pl-5 text-xl text-white'>{text}</p>
            </td>
        </tr>
    )
}