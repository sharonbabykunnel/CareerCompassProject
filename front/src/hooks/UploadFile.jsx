import React, { useState } from 'react'
import {  ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import app from '../../config/firebase';

const UploadFile = (file,fileType,setPerSec) => {
    const [inputs, setInputs] = useState({});
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPerSec(progress);
            switch (snapshot.state) {
              case "paused":
                break;
              case "running":
                break;
              default:
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;
              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
              default:
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setInputs((prev) => {
                return {
                  ...prev,
                  [fileType]: downloadURL,
                };
              });
            });
          }
    )
    return inputs 
}

export default UploadFile
