import { collection, getDocs, query, where } from "firebase/firestore";
import {db} from "./firebase"


/* Student event queries */

// student - past events (registered + completed)

export const getStudentPastEvents = async (studentUid)=>{
    try{
        const q = query(
            collection(db, "events"),
            where("status", "==","completed"),
            where("registeredUsers", "array-contains", studentUid)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    }catch (error){
        console.log("Errot fetching students past events:", error);
        return [];
    }
};

export const getStudentUpcomingEvents = async (studentUid)=>{
    try{
        const q = query(
            collection(db, "events"),
            where("status", "==", "upcoming"),
            where("registeredUsers", "array-contains", studentUid)
        );
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

    } catch (error){
        console.log("Error fetching student upcoming events:", error);
        return [];
    }
}


/* Upcoming events - not registered + registered (events page) */

export const getUpcomingEvents = async ()=>{
    try{
        const q = query(
            collection(db, "events"),
            where("status", "==", "upcoming")
        )
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data(),
        }))
    }catch(error){
        console.log("Error fetching all the upcoming events: ", error);
        return[];
    }

}