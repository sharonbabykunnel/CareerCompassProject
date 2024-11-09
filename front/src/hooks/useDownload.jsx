import { useState, useCallback } from 'react';
import { getStorage, ref, getDownloadURL, getBlob } from "firebase/storage";
import app from "../../config/firebase"; // Ensure this imports your configured Firebase app

const useDownload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadFile = useCallback(async (filePath, fileName) => {
    setIsLoading(true);
    setError(null);

    try {
    //   const storage = getStorage(app);
    //   const fileRef = ref(storage, filePath); // Create a reference using the file path
      
    //   const blob = await getBlob(fileRef); 
    //   const url = window.URL.createObjectURL(blob);

    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute('download', fileName);
      
    //   // Append to the body and trigger the download
    //   document.body.appendChild(link);
    //   link.click();
      
    //   // Clean up
    //   link.parentNode.removeChild(link);
    //   window.URL.revokeObjectURL(url);

      setIsLoading(false);
    } catch (err) {
      console.error('Error downloading file:', err);
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  return { downloadFile, isLoading, error };
};

export default useDownload;
