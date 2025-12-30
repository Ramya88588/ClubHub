import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { storage } from "./firebase";

export const uploadImage = async (file , path) =>{
    if (!file) return null;

    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);
    return url;
};

