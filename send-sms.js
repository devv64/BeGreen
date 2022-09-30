import { getDocs, query } from 'firebase/firestore';
import twilio from 'twilio'

const accountSid = 'ACd72362c23e3cb0724a4059a44b3dce46'
const authToken = 'c1618b3f06ccb8a3114257c947d47f0a'
const client = new twilio(accountSid, authToken);

const twilioNumber = '+19705925486'

const db = getFirestore(initializeApp(firebaseConfig));
const [challenge, setChallenge] = useState('')
const todaysDate = new Date().toLocaleDateString();
const todaysChallengeRef = query(collection(db, "dailyChallenge"), where("date", "==", todaysDate));

const phoneNumbers = []

const querySnapshot = await getDocs(collection(db, 'phoneNumbers'));
querySnapshot.forEach((doc) => {
    phoneNumbers.push(doc.data)
    // console.log(doc.id, " => ", doc.data());
});

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

// export default function sendSms(){
    client.messages.create({
        to: '+12017558805',
        from: twilioNumber,
        body: "Today's Challenge is: "
    })
    .then(message => console.log(message.sid, 'success'))
// }