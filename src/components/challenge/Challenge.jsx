import React, { useState } from 'react'
import 'firebase/compat/firestore';
import firebaseConfig from '../../firebase'
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function Challenge() {
    const db = getFirestore(initializeApp(firebaseConfig));

    const [challenge, setChallenge] = useState('');
    const todaysDate = new Date().toLocaleDateString();
    const todaysChallengeRef = query(collection(db, "dailyChallenge"), where("date", "==", todaysDate));

    (async () => {
        const todaysChallengeSnap = await getDocs(todaysChallengeRef);

        if (todaysChallengeSnap.empty) {
            // let size = 0;
            // query(collection(db, "challenges")).get().then(snap => {
            //     size = snap.size // will return the collection size
            // });
            // console.log(size)
            let size = 11
            const randomNum = Math.floor(Math.random() * size)
            const docRef = query(collection(db, "challenges"), where("id", "==", randomNum));
            const docSnap = await getDocs(docRef)
            let data;

            docSnap.forEach((doc) => data = doc.data());

            await setDoc(doc(db, "dailyChallenge", todaysDate.replaceAll('/', '-')), {
                id: randomNum,
                date: todaysDate,
                content: data.content
            });

            setChallenge(data.content)

        } else {
            let data;
            todaysChallengeSnap.forEach((doc) => {
                data = doc.data()
            });
            setChallenge(data.content);
        }
    })();



    return <div><h1 className='text-5xl font-bold mt-0 mb-6'>Today's Challenge: {challenge}</h1></div >
}