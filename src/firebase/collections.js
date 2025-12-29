import { collection, getDocs, query, where, doc, getDoc ,setDoc, updateDoc, addDoc, serverTimestamp} from "firebase/firestore";
import {db} from "./firebase"

//get user by their id
export const getUserById = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data();
  }

  return null;
};

// USERS 

// - Create Users

export const createUser = async (uid, data) => {
  const ref = doc(db, "users", uid);
  await setDoc(ref, {
    uid,
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// - Update Users

export const updateUser = async (uid, data) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// STUDENTS
 
// - Creating Student Profile 

export const createStudentProfile = async (uid, data) => {
  const ref = doc(db, "students", uid);
  await setDoc(ref, {
    uid,
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// CLUB REQUESTS

// - Request for Creating Club 

export const createClubRequest = async (data) => {
  const ref = collection(db, "clubRequests");
  await addDoc(ref, {
    ...data,
    status: "PENDING",
    createdAt: serverTimestamp(),
  });
};

// - Get club by their id
export const getClubById = async (clubId) => {
  const ref = doc(db, "clubs", clubId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};


// - Admin's fetch pending requests

export const getPendingClubRequests = async () => {
  const q = query(
    collection(db, "clubRequests"),
    where("status", "==", "PENDING")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// - Admin: update request status

export const updateClubRequest = async (requestId, data) => {
  const ref = doc(db, "clubRequests", requestId);
  await updateDoc(ref, data);
};

// CLUBS

// - Creating Clubs only after Approval

export const createClub = async (clubId, data) => {
  const ref = doc(db, "clubs", clubId);
  await setDoc(ref, {
    clubId,
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};


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

// Get single event by ID
export const getEventById = async (eventId) => {
  try {
    const ref = doc(db, "events", eventId);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }

    return null;
  } catch (error) {
    console.error("getEventById error:", error);
    throw error;
  }
};

// Get upcoming events registered by a user

export const getUpcomingRegisteredEvents = async (userId) =>{
    try{
        const q = query(
            collection(db, "events"),
            where("registeredUsers", "array-contains", userId),
            where("status", "==" , "upcoming")
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data(),
        }));
    }catch (error){
        console.log("Error fetching registered events : ",error );
        return [];
    }
};

// Club upcoming events
export const getClubUpcomingEvents = async (clubId) => {
  try {
    const q = query(
      collection(db, "events"),
      where("clubId", "==", clubId),
      where("status", "==", "upcoming")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error("Error fetching club upcoming events:", err);
    return [];
  }
};

// Club past events
export const getClubPastEvents = async (clubId) => {
  try {
    const q = query(
      collection(db, "events"),
      where("clubId", "==", clubId),
      where("status", "==", "completed")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error("Error fetching club past events:", err);
    return [];
  }
};
