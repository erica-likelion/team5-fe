import api from './axios';

/**
 * Upload photo to backend and get analysis result.
 * @param photoBlob - Image Blob to upload
 * @returns Promise resolving to backend response object
 */
export const uploadPhoto = async (photoBlob: Blob): Promise<any> => {
  const formData = new FormData();
  formData.append('photo', photoBlob, 'camera-photo.jpg');

  // Endpoint path to upload photo - modify according to your backend API
  const UPLOAD_PATH = '/upload'; // Modify this if your backend path changes

  try {
    const response = await api.post(UPLOAD_PATH, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // Error handling logic can be adjusted here
    throw error;
  }
};

/**
 * Example function to retrieve analysis result by ID (if needed).
 * @param id - Identifier for the result request
 * @returns Promise resolving to backend response object
 */
export const getAnalysisResult = async (id: string): Promise<any> => {
  const RESULT_PATH = `/result/${id}`; // Modify path as per your API

  try {
    const response = await api.get(RESULT_PATH);
    return response.data;
  } catch (error) {
    throw error;
  }
};
