import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL, } from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE_DB, STORAGE_DB } from '../firebase/config';

const useFirebaseUpload = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadImageAndAddToFirestore = async (photoUri, comment, location, userId, nickName,imageLocation) => {
    setIsLoading(true);

    try {
      // Upload image to Firebase Storage
      const uniquePostId = Date.now().toString();
      const storageRef = ref(STORAGE_DB, `images/${uniquePostId}`);
      const blobFile = await uriToBlob(photoUri);
      await uploadBytes(storageRef, blobFile);

      // Get the download URL of the uploaded image
      const downloadUrl = await getDownloadURL(storageRef);

      // Add data to Firestore
      await addDoc(collection(FIRESTORE_DB, 'posts'), {
        imageLocation:imageLocation,
       
        photo: downloadUrl,
        comment,
        totalLikes: 0, // You can set your initial value here
        location: location.coords,
        userId,
        nickName,
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Error uploading image and adding to Firestore:', error);
      setIsLoading(false);
    }
  };

  const uriToBlob = (photoUri) => {
    return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              // return the blob
              resolve(xhr.response);
            };
            xhr.onerror = function () {
              reject(new Error("uriToBlob failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", photoUri, true);
      
            xhr.send(null);
          });
  };

  return { uploadImageAndAddToFirestore, isLoading };
};

export default useFirebaseUpload;
