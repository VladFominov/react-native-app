import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import {  STORAGE_DB } from '../firebase/config';

const useFirebaseAvatar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadAvatar = async (userId, imageUri) => {
    setIsLoading(true);

    try {
      // Upload avatar image to Firebase Storage
     
      const avatarRef = ref(STORAGE_DB, `avatars/${userId}`);
      const blobFile = await uriToBlob(imageUri);
       await uploadBytes(avatarRef, blobFile);

      // Get the download URL of the uploaded avatar
      const uploadedAvatarUrl = await getDownloadURL(avatarRef);
      setIsLoading(false);
      return uploadedAvatarUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setIsLoading(false);
    }
  };

  const getAvatarUrl = async (userId) => {
    try {
      const userIdStr = String(userId);
      const avatarRef = ref(STORAGE_DB, `avatars/${userIdStr}`);
      const response = await getDownloadURL(avatarRef);
      
      return response;
    } catch (error) {
      console.error('Error getting avatar URL:', error);
      return null;
    }
  };

  const clearAvatar = async (userId) => {
    try {
      // Delete avatar image from Firebase Storage
      const userIdStr = String(userId);
      const avatarRef =  ref(STORAGE_DB, `avatars/${userIdStr}`);
       await deleteObject(avatarRef);

    } catch (error) {
      console.error('Error clearing avatar:', error);
    }
  };

  const uriToBlob = (imageUri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error("uriToBlob failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageUri, true);
      xhr.send(null);
    });
  };

  return { uploadAvatar, getAvatarUrl, clearAvatar,uriToBlob, isLoading };
};

export default useFirebaseAvatar;
