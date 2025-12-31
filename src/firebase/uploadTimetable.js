import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export async function uploadTimetableImage(file, uid) {
  const storageRef = ref(
    storage,
    `timetables/${uid}/${Date.now()}-${file.name}`
  );

  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef); // public HTTPS URL
}
