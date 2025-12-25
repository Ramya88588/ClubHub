import { signInWithPopup , signOut} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "./firebase";

const getRoleFromEmail = (email) => {
  if (!email) return "unauthorized";

  const domain = email.toLowerCase();
  if (domain === "sjruva2006@gmail.com") return "club";
  if (domain.endsWith("@vitapstudent.ac.in")) return "student";
  if (domain.endsWith("@vitap.ac.in")) return "club";

  return "unauthorized";
};


export const googleSignIn = async () =>{
    try{
        const result = await signInWithPopup(auth, googleProvider);
        const user =  result.user;
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if(!snap.exists()){
            const role = getRoleFromEmail(user.email);
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                role,
                createdAt: Date.now(),
            });
            return {...user, role};
        }
        return {...user, role: snap.data().role};
    }catch (error){
        console.error("Google sign in error: ", error);
        throw error;
    }
}

export const logoutUser = async () =>{
  await signOut(auth);
}
