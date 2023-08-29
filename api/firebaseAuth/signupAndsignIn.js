import { auth} from '../../conf/firebase.js';
import {
     getAuth, 
     signInWithEmailAndPassword, 
     createUserWithEmailAndPassword,
     sendEmailVerification,
     updateProfile,
     signOut
    } from 'firebase/auth';
export async function loginWithEmailAndPassword(email,password){
    const _auth = getAuth(auth());
    return await signInWithEmailAndPassword(_auth, email, password).then((userCred) => {
        const user = userCred.user;
        if(user.emailVerified){
            const userData = {
                'email':user.email,
                'uid':user.uid,
                'name':user.displayName,
                'avata':user.photoURL,
                'accesstoken': user.stsTokenManager.accessToken,
            }
            return {
                'code':200,
                'msg':'success',
                'data':userData
            };
        }
        return {
            'code':400,
            'msg':'not_verified',
            'data':null
        };
    }).catch((error)=>{
        return {
            'code':501,
            'msg':'wrong_auth',
            'data':error
        };
    })
}

export async function registerUserWithEmailAndPassword(name,photo,email,password){
    const _auth = getAuth(auth());
    return await createUserWithEmailAndPassword(_auth,email,password).then(async (userCred)=>{
        if(userCred.user != null){
            await sendEmailVerification(userCred.user);
            await updateProfile(userCred.user,{
                displayName:name,
                photoURL:photo
            });
            return {
                'code':200,
                'msg':"email_send",
                'data':null
            };
        }
    }).catch((error)=>{
        return {
            'code':400,
            'msg':error.customData._tokenResponse.error.message,
            'data':null
        }
    })
}

