import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default function ChatMessage({key, message, chatRef}) {
    const auth = firebase.auth();
    // const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';
    const { text, uid, photoURL } = message

    return (
        // <div className={`message ${messageClass}`}>
        // <div className="inline-table">
        //     <img className='w-auto h-auto rounded-full h-12 w-12' src={photoURL} alt='' />
        //     <p className=''>{text}</p>
        //     <br />
        // </div>

        <tr className='m-5'>
            <td><img className='w-auto h-auto rounded-full h-12 w-12' src={photoURL} alt='Google Profile' /></td>
            <td><p className='pl-5 text-xl text-white'>{text}</p></td>
        </tr>
    )
}