import React, { useState } from 'react'
import 'firebase/compat/firestore';
import firebaseConfig from '../../firebase'
import { getDocs, collection, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function Challenge() {
    const db = getFirestore(initializeApp(firebaseConfig));
    const [challenge, setChallenge] = useState('')
    const todaysDate = new Date().toLocaleDateString();
    const todaysChallengeRef = query(collection(db, "dailyChallenge"), where("date", "==", todaysDate));

    if (todaysChallengeRef) {
        (async () => {
            const todaysChallengeSnap = await getDocs(todaysChallengeRef);
            let data;
            todaysChallengeSnap.forEach((doc) => {
                data = doc.data()
            });
            setChallenge(data.content);
        })();

    } else {
        let size = 0;

        query(collection(db, "challenges")).get().then(snap => {
            size = snap.size // will return the collection size
        });
        const randomNum = Math.floor(Math.random() * size)
        const docRef = query(collection(db, "challenges"), where("id", "==", "randomNum"));

        (async () => {
            const docSnap = await getDocs(docRef)
            let data;
            docSnap.forEach((doc) => {
                data = doc.data()
            });
            db.collection("todaysChallenge").set({
                id: randomNum,
                date: todaysDate,
                content: docSnap
            })

            setChallenge(data.content)
        })();
    }
    return (
        <div className="box">
            <div className="inner">
                <span>{challenge}</span>
            </div>
            <div className="inner">
                <span>{challenge}</span>
            </div>
        </div>
        // <div>
        //     <h1 className='text-5xl font-bold mt-0 mb-6'>Today's Challenge: {challenge}</h1>
        // </div>
    )
}